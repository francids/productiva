# Productiva Mente

[![Netlify Status](https://api.netlify.com/api/v1/badges/765e73e4-2d31-4ea1-958c-fea0d7118eaa/deploy-status)](https://app.netlify.com/sites/productiva-mente/deploys)

**Productiva Mente** es una aplicación web para la gestión de tareas y notas diseñada con la línea de diseño de Material.

## Características Principales

- **Gratuita y de Código Abierto**: Usa y contribuye a este proyecto sin costo alguno.
- **Privacidad Garantizada**: Tus datos se almacenan localmente en tu navegador, asegurando tu privacidad.
- **Sin Publicidad**: Disfruta de una experiencia sin interrupciones.

## Acceso a la Aplicación

La aplicación está disponible en: [https://productiva-mente.netlify.app](https://productiva-mente.netlify.app)

## Capturas de Pantalla

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Home%20screen%20(light).png">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Home%20screen%20(dark).png">
  <img alt="Home screen" src="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Home%20screen%20(light).png">
</picture>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Notes%20screen%20(light).png">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Notes%20screen%20(dark).png">
  <img alt="Tasks screen" src="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Notes%20screen%20(light).png">
</picture>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Tasks%20screen%20(light).png">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Tasks%20screen%20(dark).png">
  <img alt="Tasks screen" src="https://raw.githubusercontent.com/francids/productiva-mente/main/screenshots/Tasks%20screen%20(light).png">
</picture>

## Tecnologías Utilizadas

- [Angular](https://angular.dev/): Framework principal para la construcción de la aplicación.
- [Material](https://material.angular.io/): Componentes de diseño para una interfaz de usuario moderna y accesible.
- [Dexie](https://dexie.org/): Base de datos local para almacenamiento eficiente.
- [Milkdown](https://milkdown.dev/): Editor de texto enriquecido para la creación de notas.

## Ejecución Local con Docker

Puedes ejecutar la aplicación en tu máquina local utilizando Docker con el siguiente comando:

```bash
docker run -p 80:80 francids/productiva-mente
```

A partir de este comando, la aplicación estará disponible en [localhost](http://localhost).
