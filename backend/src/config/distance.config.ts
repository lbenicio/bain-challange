import { registerAs } from '@nestjs/config';

export default registerAs('distance', () => ({
  routerApiUrl:
    process.env.DISTANCE_API_URL || 'http://router.project-osrm.org',
  coordinatesApiUrl:
    process.env.COORDINATES_API_URL || 'https://nominatim.openstreetmap.org',
  versioning: 1,
  coordinatesApiSleepTime:
    parseInt(process.env.COORDINATE_SERVICE_SLEEP_TIME_MS, 10) || 5000,
}));
