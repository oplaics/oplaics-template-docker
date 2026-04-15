import { useEffect } from 'react'

export default function useTitleHook(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}