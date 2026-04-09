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
  ffmpeg \
  chromium \
  libzip-dev \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  default-mysql-client \
  && rm -rf /var/lib/apt/lists/*

# Nos movemos a /var/www/
WORKDIR /var/www/

# Install PHP extensions and clean caches
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) \
    gd \
    bcmath \
    mysqli \
    pdo_mysql \
    zip \
    pcntl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/* /tmp/* /var/tmp/* /usr/src/php*

# Instalar composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Exponemos el puerto 9000 a la network
EXPOSE 9000