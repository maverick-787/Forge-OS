import {
  ResourceDecorator as Resource,
  Injectable,
  ExecutionContext,
} from '@nitrostack/core';

@Injectable()
export class ForgeResources {

  @Resource({
    name: 'machine_logs',
    uri: 'resource://forge/machine_logs',
    description: 'Live telemetry and error codes from the factory floor.',
  })
  async getMachineLogs(ctx: ExecutionContext) {
    return JSON.stringify({
      machine_id: 'CNC-MILL-04',
      status: 'CRITICAL_FAULT',
      active_error_code: 'ERR-702-THERMAL',
    });
  }

  @Resource({
    name: 'engineering_manual',
    uri: 'resource://forge/engineering_manual',
    description: 'Technical specs and repair procedures.',
  })
  async getEngineeringManual(ctx: ExecutionContext) {
    return 'Error ERR-702-THERMAL: Spindle temp exceeded 130C. Inspect coolant pump Part #CP-400.';
  }

  @Resource({
    name: 'inventory',
    uri: 'resource://forge/inventory',
    description: 'Current warehouse spare parts inventory.',
  })
  async getInventory(ctx: ExecutionContext) {
    return JSON.stringify({
      part_id: 'CP-400',
      quantity_on_hand: 0,
    });
  }

  @Resource({
    name: 'production_schedule',
    uri: 'resource://forge/production_schedule',
    description: 'Current production run and downtime penalties.',
  })
  async getProductionSchedule(ctx: ExecutionContext) {
    return JSON.stringify({
      active_order: 'Aerospace Dynamics',
      penalty_per_hour: 5000,
    });
  }

  @Resource({
    name: 'safety_sop',
    uri: 'resource://forge/safety_sop',
    description: 'OSHA Lockout/Tagout procedures.',
  })
  async getSafetySop(ctx: ExecutionContext) {
    return 'LOTO Procedure: Disconnect main power at Breaker Box 4 before opening casing.';
  }

  @Resource({
    name: 'supplier_data',
    uri: 'resource://forge/supplier_data',
    description: 'Supplier delivery times and costs.',
  })
  async getSupplierData(ctx: ExecutionContext) {
    return JSON.stringify({
      supplier: 'FastTrak Industrials',
      eta_hours: 2,
      cost: 800,
    });
  }

  @Resource({
    name: 'maintenance_history',
    uri: 'resource://forge/maintenance_history',
    description: 'Historical repairs for the machine.',
  })
  async getMaintenanceHistory(ctx: ExecutionContext) {
    return JSON.stringify([
      {
        date: '2025-11-04',
        issue: 'Coolant leak',
      },
    ]);
  }
}