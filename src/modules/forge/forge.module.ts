import { Module } from '@nitrostack/core';
import { ForgeService } from './forge.service.js';
import { ForgeTools } from './forge.tools.js';
import { ForgeResources } from './forge.resources.js';

@Module({
    name: 'forge',
    description: 'Forge-OS Industrial Incident Command module',
    controllers: [ForgeTools, ForgeResources],
    providers: [ForgeService],
})
export class ForgeModule { }
