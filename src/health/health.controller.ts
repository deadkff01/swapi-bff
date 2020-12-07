import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  DNSHealthIndicator,
} from '@nestjs/terminus';
import { environment } from '../config/endpoints';

/**
 * Verify if swapi api is up
 */
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dns.pingCheck('swapi-dev-api', environment),
    ]);
  }
}
