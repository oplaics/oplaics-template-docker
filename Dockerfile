FROM php:8.4-fpm

# Set user and group to match host user
ARG HOST_UID=1000
ARG HOST_GID=1000
RUN groupadd -g ${HOST_GID} hostgroup || true \
 && useradd -u ${HOST_UID} -g ${HOST_GID} -m hostuser || true

# Install Node.js and system dependencies in a single RUN command to reduce layers
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get update \
  && apt-get install -y \
  nodejs \
  chromium \
  libzip-dev \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  default-mysql-client \
  && rm -rf /var/lib/apt/lists/*

# Nos movemos a /var/www/
WORKDIR /var/www/

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd \
  bcmath \
  mysqli \
  pdo_mysql \
  zip \
  pcntl

# Instalar composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Exponemos el puerto 9000 a la network
EXPOSE 9000

# Add cron job
RUN echo "* * * * * cd /app && /usr/local/bin/php artisan schedule:run >> /dev/null 2>&1" >> /etc/cron.d/artisan-schedule

# Set PHP configurations
RUN echo 'memory_limit = 2048M' > /usr/local/etc/php/conf.d/docker-php-memlimit.ini \
  && echo 'post_max_size = 20M' > /usr/local/etc/php/conf.d/docker-php-post_max.ini \
  && echo 'upload_max_filesize = 20M' > /usr/local/etc/php/conf.d/docker-php-upload_max.ini