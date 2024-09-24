// Determina si la aplicación está corriendo en localhost o en un servidor local
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' || // Hostname para localhost
    window.location.hostname === '[::1]' || // Dirección IPv6 para localhost
    window.location.hostname.match(/^127(?:\.\d+){0,2}\.\d+$/) // Dirección IPv4 para localhost (127.0.0.1 - 127.255.255.255)
);

// Definimos un tipo para las configuraciones opcionales que pueden incluir funciones de éxito o actualización
type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void; // Función que se ejecuta cuando el service worker se registra correctamente
  onUpdate?: (registration: ServiceWorkerRegistration) => void; // Función que se ejecuta cuando hay una actualización del service worker
};

// Función para registrar el Service Worker
export function register(config?: Config) {
  // Solo registra el Service Worker si estamos en producción y el navegador soporta Service Workers
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Obtenemos la URL pública de la aplicación para asegurarnos de que está en el mismo origen
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return; // Si no es el mismo origen, salimos sin registrar el Service Worker
    }

    // Esperamos a que la ventana cargue completamente antes de registrar el Service Worker
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`; // URL del archivo del Service Worker

      // Si estamos en localhost, verificamos el Service Worker para asegurar que funciona correctamente
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config); // Verificamos que el Service Worker sea válido
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Esta aplicación está siendo servida por un Service Worker en modo local.'
          );
        });
      } else {
        // Si no estamos en localhost, simplemente registramos el Service Worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

// Función para registrar el Service Worker y manejar actualizaciones
function registerValidSW(swUrl: string, config?: Config) {
  // Intentamos registrar el Service Worker
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // Evento que se dispara cuando se detecta una actualización en el Service Worker
      registration.onupdatefound = () => {
        const installingWorker = registration.installing; // El worker que se está instalando
        if (installingWorker == null) {
          return; // Si no hay worker instalándose, salimos
        }
        installingWorker.onstatechange = () => {
          // Escuchamos los cambios en el estado del worker
          if (installingWorker.state === 'installed') {
            // Si el Service Worker está instalado:
            if (navigator.serviceWorker.controller) {
              // Si hay un controlador (significa que el nuevo contenido está disponible pero no está siendo usado aún)
              console.log('Nuevo contenido disponible; por favor, refresca.');
              if (config && config.onUpdate) {
                config.onUpdate(registration); // Llamamos a la función de actualización si está definida
              }
            } else {
              // Si no hay controlador (esto ocurre la primera vez que el Service Worker se instala)
              console.log('Contenido cacheado para uso offline.');
              if (config && config.onSuccess) {
                config.onSuccess(registration); // Llamamos a la función de éxito si está definida
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error al registrar el Service Worker:', error); // Manejamos cualquier error en el registro
    });
}

// Función para verificar si el Service Worker es válido (solo en localhost)
function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Intentamos cargar el archivo del Service Worker para verificar que es válido
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }, // Esto asegura que estamos cargando un script
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      // Si el archivo no existe (404) o no es JavaScript, desregistramos el Service Worker y recargamos la página
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload(); // Recargamos la página si el Service Worker no es válido
          });
        });
      } else {
        // Si el Service Worker es válido, lo registramos normalmente
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'Sin conexión a Internet. La aplicación está funcionando en modo offline.'
      );
    });
}

// Función para desregistrar el Service Worker
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister(); // Desregistra el Service Worker
    });
  }
}
