import { ToolDecorator as Tool, Injectable, z, Widget } from '@nitrostack/core';
import { ForgeService } from './forge.service.js';

@Injectable({ deps: [ForgeService] })
export class ForgeTools {
    constructor(private readonly forgeService: ForgeService) { }

    @Tool({
        name: 'create_maintenance_ticket',
        description: 'Creates a maintenance ticket for a factory machine.',
        inputSchema: z.object({ machineId: z.string(), issue: z.string() })
    })
    async createMaintenanceTicket(args: { machineId: string, issue: string }) {
        return `Ticket created for ${args.machineId}: ${args.issue}`;
    }

    @Tool({
        name: 'reserve_spare',
        description: 'Reserves a spare part from the inventory.',
        inputSchema: z.object({ partId: z.string(), quantity: z.number() })
    })
    async reserveSpare(args: { partId: string, quantity: number }) {
        return `Reserved ${args.quantity} of ${args.partId}`;
    }

    @Tool({
        name: 'notify_production',
        description: 'Notifies production of downtime and rerouting.',
        inputSchema: z.object({ machineId: z.string(), downtimeEtaHours: z.number() })
    })
    async notifyProduction(args: { machineId: string, downtimeEtaHours: number }) {
        return `Production notified: ${args.machineId} down for ${args.downtimeEtaHours} hrs.`;
    }

    @Tool({
        name: 'notify_finance',
        description: 'Notifies finance of expected monetary loss.',
        inputSchema: z.object({ estimatedLoss: z.number() })
    })
    async notifyFinance(args: { estimatedLoss: number }) {
        return `Finance notified. Estimated loss: $${args.estimatedLoss}`;
    }

    @Tool({
        name: 'order_spare',
        description: 'Orders a new spare part from a supplier.',
        inputSchema: z.object({ partId: z.string(), supplier: z.string(), cost: z.number() })
    })
    async orderSpare(args: { partId: string, supplier: string, cost: number }) {
        return `Ordered ${args.partId} from ${args.supplier} for $${args.cost}`;
    }

    @Tool({
        name: 'generate_incident_report',
        description: 'Generates a formal incident report.',
        inputSchema: z.object({ summary: z.string() })
    })
    async generateIncidentReport(args: { summary: string }) {
        return `Incident Report Archived: ${args.summary}`;
    }

    @Tool({
        name: 'close_incident',
        description: 'Closes the current factory incident.',
        inputSchema: z.object({ incidentId: z.string() })
    })
    async closeIncident(args: { incidentId: string }) {
        return `Incident ${args.incidentId} closed.`;
    }
    @Tool({
        name: 'analyze_incident',
        description: 'Analyzes an industrial incident and generates a Decision Twin.',
        inputSchema: z.object({})
    })
    @Widget({ route: 'decision-twin' })
    async analyzeIncident() {
        return this.forgeService.analyzeIncident();
    }   
}
