# Emerald Proxy

## Instalation

- Clone repo

```bash
git clone https://github.com/delusionzz/Emerald
```

- cd and install dependencies

```bash
cd Emerald && npm i
```

# Using a reverse proxy for bare ?

- comment the following line in the `next.config.mjs` file

```js
    async rewrites() {
        return [
            {
                source: '/bare/',
                destination: 'https://tomp.app/',
            },
            {
                source: '/bare/:path*',
                destination: 'https://tomp.app/:path*/',
            },
        ]
    },
```

- Build and Start proxy

```bash
npm run build && npm run start
```

### Making your Caddy config

- create a file called `Caddyfile`

```bash
touch Caddyfile
```

- Make the actual config

```bash
nano Caddyfile
```

- input the following config

```
YOUR_DOMAIN {
    reverse_proxy localhost:3000
    handle /bare/* {
        # remove this if your bare prefix is /bare/
        uri strip_prefix /bare
        reverse_proxy YOUR_BARE_SERVER
    }
}

```

## Using Docker?

- Clone repo

```bash
git clone https://github.com/delusionzz/Emerald
```

- Build image

```bash
    docker build . -t illusions/emerald
```

- Run image on port 3000

```bash
    docker run -p 3000:3000 -d illusions/emerald
```
