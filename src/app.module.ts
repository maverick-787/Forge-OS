import { McpApp, Module, ConfigModule } from '@nitrostack/core';
import { ForgeModule } from './modules/forge/forge.module.js';

/**
 * Root Application Module
 * 
 * Forge-OS: Industrial Incident Command System
 * From Machine Failure to Executive Decision in Under 60 Seconds.
 */
@McpApp({
    module: AppModule,
    server: {
        name: 'forge-os-incident-commander',
        version: '1.0.0'
    },
    logging: {
        level: 'info'
    }
})
@Module({
    name: 'forge-os',
    description: 'Industrial Incident Command System',
    imports: [
        ConfigModule.forRoot(),
        ForgeModule
    ],
})
export class AppModule { }
