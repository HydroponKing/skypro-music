
# Skypro Music

**Курсовая**


## Установка и запуск проекта

1. Клонируйте репозиторий:

```bash
git clone https://github.com/ваш-репозиторий/skypro-music.git
```

2. Перейдите в директорию проекта:

```bash
cd skypro-music
```

3. Установите зависимости:

```bash
npm install
```

4. Запустите локальный сервер разработки:

```bash
npm run dev
```



#### #### #### ####
## Работа с API ##

Для получения треков используется публичное API Skypro Music. В случае ошибки выводится сообщение об ошибке.

Пример использования `axios`:

```typescript
import axios from 'axios';

async function fetchTracks() {
  try {
    const response = await axios.get('https://api.skypro-music.com/tracks');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw new Error('Не удалось загрузить треки. Попробуйте позже.');
  }
}
```

