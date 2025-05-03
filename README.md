<p align="center">
<img src="https://github.com/luca-naujoks/observer/blob/development/public/icon.png" width="120" alt="AniStream Logo" />

<h1 align="center">AniStream</h1>
</p>

> [!NOTE]
> This Project is only working in combination with the [anistream api / observatory](https://github.com/luca-naujoks/AniStream-API)

<p>
  AniStream is a Web Interface for your Local media Library. It leveages the power of the AniStream Backend to manage Anime or Series that are Online and Locally Available while holding on to a slick modern desing.
</p>

## Demo

Want to try out a Demo or just check the style?
Here is a working but limited [Demo](https://luca-naujoks.de/demo/anistream)

### Landing Page

The First Page you will face when opening AniStream will be the Overview page with all the currently hot and trending Anime and Series.

<img src="https://github.com/luca-naujoks/observer/blob/development/public/overview.png" alt="AniStream Overview" />

### Local Media Overview

<img src="https://github.com/luca-naujoks/observer/blob/development/public/watchlistOverview.png" width="120" alt="AniStream Watchlist Media" />

### Anime and Series Overview

<img src="https://github.com/luca-naujoks/observer/blob/development/public/animeOverview.png" alt="AniStream Anime Overview" />

<img src="https://github.com/luca-naujoks/observer/blob/development/public/seriesOverview.png" alt="AniStream Series Overview" />

## Mobile support

The AniStream web application is compatible down to tablet size.

## Project setup

```bash
# Clone the Repository
$ git clone https://github.com/luca-naujoks/observer.git

# Move into project directory
$ cd observer

# install all dependencies
$ npm install
```

## Compile and run the project

```bash
# build the project
$ npm run build

# start in production mode
$ npm run start
```

## Docker Deployment

AniStream is available as a Docker image hosted on the GitHub Container Registry. You can pull the image and run it directly or use Docker Compose for a more integrated setup with the AniStream API.

#### Pull and Run the Docker Image

```bash
# Pull the AniStream image from GitHub Container Registry
$ docker pull ghcr.io/luca-naujoks/anistream:latest

# Run the container
$ docker run -d -p 3000:3000 --name anistream ghcr.io/luca-naujoks/anistream:latest
```

### Docker Compose with AniStream API

To deploy AniStream alongside the AniStream API, create a `docker-compose.yml` file with the following content:

```yaml
version: "3.8"

services:
  anistream-api:
    image: ghcr.io/luca-naujoks/anistream-api:latest
    container_name: anistream-api
    ports:
      - "3001:3001"
    volumes:
      - anistream-api_configuration:/app/configuration

  anistream:
    image: ghcr.io/luca-naujoks/anistream:latest
    container_name: anistream
    ports:
      - "3000:3000"
    volumes:
      - anistream_config:/app/config
    depends_on:
      - anistream-api

volumes:
  anistream-api_configuration:
  anistream_config:
```

#### Deploy with Docker Compose

```bash
# Start the services
$ docker-compose up -d
```

You can now access your fully deployed Anistream instance at `<your-ip-address>`:3000, where you can start the setup process by connecting the Web App to the API.

Tip: The API should be accessible at `<your-ip-address>`:3001.

## License

AniStream is [MIT licensed](https://github.com/luca-naujoks/oberser-backend/blob/master/LICENSE).
