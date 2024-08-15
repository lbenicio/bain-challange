# Bain challange

Bain challange solution

## Live devo

https://bain-challange.lbenicio.dev

## How to run

```bash
docker network create expose
```

```bash
docker exec -it bain-challange-backend sh
```

```bash
npm run db:migrate
```

```bash
docker compose up
```

Access the test endpoint

```text
http://localhost:5734
```

## Resources

- Postgres Database
- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)

## License

[GPL-3.0](./LICENSE)
