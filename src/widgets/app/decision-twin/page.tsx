'use client';

import { useTheme, useMaxHeight, useWidgetSDK } from '@nitrostack/widgets';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

interface Strategy {
    strategy: string;
    confidence: number;
    downtime: string;
    estimatedCost: number;
    operationalRisk: string;
    pros: string[];
    cons: string[];
}

interface ExecutionStep {
    step: number;
    tool: string;
    description: string;
}

interface DecisionTwinData {
    executiveSummary: string;
    incident: {
        incidentId: string;
        machine: string;
        productionLine: string;
        fault: string;
        detectedError: string;
        severity: string;
        detectedAt: string;
    };
    resourceSnapshot: {
        machineLogs: { status: string; errorCode: string };
        engineeringManual: { recommendedPart: string; maximumTemperature: string };
        inventory: { partId: string; quantityAvailable: number };
        supplier: { supplier: string; etaHours: number; quotedCost: number };
        production: { activeOrder: string; downtimePenaltyPerHour: number };
        maintenanceHistory: { previousFailures: number; recurringIssue: string };
    };
    analysis: {
        detectedFault: string;
        rootCause: string;
        machineTemperature: string;
        coolantPressure: string;
        vibrationLevel: string;
        evidence: string[];
    };
    businessImpact: {
        estimatedLoss: number;
        downtimeCostPerHour: number;
        affectedOrders: number;
        productionPriority: string;
    };
    decisionTwinSimulation: Strategy[];
    recommendation: {
        selectedStrategy: string;
        confidence: number;
        reasoning: string[];
        expectedOutcome: {
            expectedDowntime: string;
            estimatedSavings: number;
            operationalRisk: string;
            productionRecovery: string;
        };
    };
    executionPlan: ExecutionStep[];
    timestamp: string;
}

export default function DecisionTwinWidget() {
    const theme = useTheme();
    const maxHeight = useMaxHeight();
    const isDark = theme === 'dark';

    const { isReady, getToolOutput } = useWidgetSDK();
    const data = getToolOutput<DecisionTwinData>();

    const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>('summary');

    // Defensive rendering
    if (!isReady) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                color: isDark ? '#fff' : '#000',
            }}>
                Initializing Decision Twin...
            </div>
        );
    }

    if (!data) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                color: isDark ? '#fff' : '#000',
            }}>
                Loading analysis...
            </div>
        );
    }

    const incident = data.incident ?? {};
    const analysis = data.analysis ?? {};
    const businessImpact = data.businessImpact ?? {};
    const recommendation = data.recommendation ?? {};
    const strategies = data.decisionTwinSimulation ?? [];
    const executionPlan = data.executionPlan ?? [];

    const getSeverityColor = (severity: string) => {
        switch (severity?.toUpperCase()) {
            case 'CRITICAL':
                return isDark ? '#ef4444' : '#dc2626';
            case 'HIGH':
                return isDark ? '#f97316' : '#ea580c';
            case 'MEDIUM':
                return isDark ? '#eab308' : '#ca8a04';
            default:
                return isDark ? '#22c55e' : '#16a34a';
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk?.toLowerCase()) {
            case 'high':
                return isDark ? '#ef4444' : '#dc2626';
            case 'medium':
                return isDark ? '#eab308' : '#ca8a04';
            case 'low':
                return isDark ? '#22c55e' : '#16a34a';
            default:
                return isDark ? '#6b7280' : '#9ca3af';
        }
    };

    return (
        <div style={{
            background: isDark ? '#0a0a0a' : '#f9fafb',
            minHeight: '400px',
            maxHeight: maxHeight || '800px',
            overflow: 'auto',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
            {/* Header */}
            <div style={{
                background: isDark ? '#1a1a1a' : '#ffffff',
                borderBottom: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                padding: '20px',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <AlertCircle size={24} color={getSeverityColor(incident.severity)} />
                    <div>
                        <h1 style={{
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: '700',
                            color: isDark ? '#fff' : '#111',
                        }}>
                            Decision Twin Analysis
                        </h1>
                        <p style={{
                            margin: '4px 0 0 0',
                            fontSize: '12px',
                            color: isDark ? '#999' : '#666',
                        }}>
                            {incident.incidentId} • {incident.machine}
                        </p>
                    </div>
                </div>

                {/* Executive Summary */}
                <div style={{
                    background: isDark ? '#111' : '#f3f4f6',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: isDark ? '#e5e7eb' : '#374151',
                }}>
                    {data.executiveSummary}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '16px' }}>
                {/* Incident Overview */}
                <div style={{
                    background: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                }}>
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'incident' ? null : 'incident')}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: isDark ? '#1a1a1a' : '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: isDark ? '#fff' : '#111',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        <span>🔴 Incident Details</span>
                        {expandedSection === 'incident' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {expandedSection === 'incident' && (
                        <div style={{
                            padding: '16px',
                            borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                            fontSize: '13px',
                        }}>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Machine</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>{incident.machine}</p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Fault</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>{incident.fault}</p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Error Code</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>{incident.detectedError}</p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Severity</p>
                                <p style={{
                                    margin: 0,
                                    color: getSeverityColor(incident.severity),
                                    fontWeight: '600',
                                }}>
                                    {incident.severity}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Analysis */}
                <div style={{
                    background: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                }}>
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'analysis' ? null : 'analysis')}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: isDark ? '#1a1a1a' : '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: isDark ? '#fff' : '#111',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        <span>🔬 Root Cause Analysis</span>
                        {expandedSection === 'analysis' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {expandedSection === 'analysis' && (
                        <div style={{
                            padding: '16px',
                            borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                        }}>
                            <div style={{ marginBottom: '12px' }}>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Root Cause</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600', fontSize: '14px' }}>{analysis.rootCause}</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                <div>
                                    <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px' }}>Temperature</p>
                                    <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>{analysis.machineTemperature}</p>
                                </div>
                                <div>
                                    <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px' }}>Pressure</p>
                                    <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>{analysis.coolantPressure}</p>
                                </div>
                                <div>
                                    <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px' }}>Vibration</p>
                                    <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>{analysis.vibrationLevel}</p>
                                </div>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 8px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Evidence</p>
                                <ul style={{ margin: 0, paddingLeft: '20px', color: isDark ? '#e5e7eb' : '#374151', fontSize: '13px' }}>
                                    {(analysis.evidence ?? []).map((item, idx) => (
                                        <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Business Impact */}
                <div style={{
                    background: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                }}>
                    <button
                        onClick={() => setExpandedSection(expandedSection === 'impact' ? null : 'impact')}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: isDark ? '#1a1a1a' : '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: isDark ? '#fff' : '#111',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        <span>💰 Business Impact</span>
                        {expandedSection === 'impact' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {expandedSection === 'impact' && (
                        <div style={{
                            padding: '16px',
                            borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                            fontSize: '13px',
                        }}>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Estimated Loss</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600', fontSize: '16px' }}>
                                    ${(businessImpact.estimatedLoss ?? 0).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Cost/Hour</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600', fontSize: '16px' }}>
                                    ${(businessImpact.downtimeCostPerHour ?? 0).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Affected Orders</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600', fontSize: '16px' }}>
                                    {businessImpact.affectedOrders ?? 0}
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Priority</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>
                                    {businessImpact.productionPriority}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recovery Strategies */}
                <div style={{
                    background: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        padding: '12px 16px',
                        background: isDark ? '#1a1a1a' : '#ffffff',
                        borderBottom: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                        color: isDark ? '#fff' : '#111',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}>
                        🎯 Recovery Strategies ({strategies.length})
                    </div>

                    {strategies.map((strategy, idx) => (
                        <div key={idx} style={{
                            borderTop: idx > 0 ? `1px solid ${isDark ? '#333' : '#e5e7eb'}` : 'none',
                        }}>
                            <button
                                onClick={() => setExpandedStrategy(expandedStrategy === idx ? null : idx)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    background: isDark ? '#1a1a1a' : '#ffffff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    color: isDark ? '#fff' : '#111',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>{strategy.strategy}</span>
                                    <span style={{
                                        background: isDark ? '#333' : '#f3f4f6',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '500',
                                    }}>
                                        {strategy.confidence}% confidence
                                    </span>
                                </div>
                                {expandedStrategy === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            {expandedStrategy === idx && (
                                <div style={{
                                    padding: '16px',
                                    borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                                    background: isDark ? '#111' : '#f9fafb',
                                    fontSize: '13px',
                                }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                        <div>
                                            <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px' }}>Downtime</p>
                                            <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>{strategy.downtime}</p>
                                        </div>
                                        <div>
                                            <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px' }}>Cost</p>
                                            <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600' }}>${strategy.estimatedCost.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '11px' }}>Risk</p>
                                            <p style={{ margin: 0, color: getRiskColor(strategy.operationalRisk), fontWeight: '600' }}>
                                                {strategy.operationalRisk}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '12px' }}>
                                        <p style={{ margin: '0 0 6px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Pros</p>
                                        <ul style={{ margin: 0, paddingLeft: '20px', color: isDark ? '#e5e7eb' : '#374151' }}>
                                            {(strategy.pros ?? []).map((pro, i) => (
                                                <li key={i} style={{ marginBottom: '2px', fontSize: '12px' }}>{pro}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <p style={{ margin: '0 0 6px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Cons</p>
                                        <ul style={{ margin: 0, paddingLeft: '20px', color: isDark ? '#e5e7eb' : '#374151' }}>
                                            {(strategy.cons ?? []).map((con, i) => (
                                                <li key={i} style={{ marginBottom: '2px', fontSize: '12px' }}>{con}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Recommendation */}
                <div style={{
                    background: isDark ? '#1a1a1a' : '#ffffff',
                    border: `2px solid ${isDark ? '#22c55e' : '#16a34a'}`,
                    borderRadius: '8px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        padding: '12px 16px',
                        background: isDark ? '#1a1a1a' : '#ffffff',
                        borderBottom: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: isDark ? '#22c55e' : '#16a34a',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}>
                        <CheckCircle size={18} />
                        Recommended Strategy
                    </div>

                    <div style={{ padding: '16px' }}>
                        <h3 style={{
                            margin: '0 0 8px 0',
                            fontSize: '16px',
                            fontWeight: '700',
                            color: isDark ? '#fff' : '#111',
                        }}>
                            {recommendation.selectedStrategy}
                        </h3>

                        <div style={{
                            background: isDark ? '#111' : '#f9fafb',
                            padding: '12px',
                            borderRadius: '6px',
                            marginBottom: '12px',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            gap: '12px',
                            fontSize: '12px',
                        }}>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '10px', textTransform: 'uppercase' }}>Confidence</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600', fontSize: '14px' }}>
                                    {recommendation.confidence}%
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '10px', textTransform: 'uppercase' }}>Downtime</p>
                                <p style={{ margin: 0, color: isDark ? '#fff' : '#111', fontWeight: '600', fontSize: '14px' }}>
                                    {recommendation.expectedOutcome?.expectedDowntime}
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '10px', textTransform: 'uppercase' }}>Savings</p>
                                <p style={{ margin: 0, color: isDark ? '#22c55e' : '#16a34a', fontWeight: '600', fontSize: '14px' }}>
                                    ${(recommendation.expectedOutcome?.estimatedSavings ?? 0).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p style={{ margin: '0 0 4px 0', color: isDark ? '#999' : '#666', fontSize: '10px', textTransform: 'uppercase' }}>Risk</p>
                                <p style={{
                                    margin: 0,
                                    color: getRiskColor(recommendation.expectedOutcome?.operationalRisk),
                                    fontWeight: '600',
                                    fontSize: '14px',
                                }}>
                                    {recommendation.expectedOutcome?.operationalRisk}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p style={{ margin: '0 0 8px 0', color: isDark ? '#999' : '#666', fontSize: '11px', textTransform: 'uppercase' }}>Reasoning</p>
                            <ul style={{ margin: 0, paddingLeft: '20px', color: isDark ? '#e5e7eb' : '#374151', fontSize: '13px' }}>
                                {(recommendation.reasoning ?? []).map((reason, idx) => (
                                    <li key={idx} style={{ marginBottom: '4px' }}>{reason}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Execution Plan */}
                <div style={{
                    background: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        padding: '12px 16px',
                        background: isDark ? '#1a1a1a' : '#ffffff',
                        borderBottom: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                        color: isDark ? '#fff' : '#111',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}>
                        📋 Execution Plan
                    </div>

                    <div style={{ padding: '16px' }}>
                        {(executionPlan ?? []).map((step, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                gap: '12px',
                                marginBottom: idx < (executionPlan.length - 1) ? '16px' : 0,
                            }}>
                                <div style={{
                                    minWidth: '32px',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: isDark ? '#333' : '#e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '600',
                                    color: isDark ? '#fff' : '#111',
                                    fontSize: '14px',
                                }}>
                                    {step.step}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        margin: '0 0 4px 0',
                                        color: isDark ? '#fff' : '#111',
                                        fontWeight: '600',
                                        fontSize: '13px',
                                    }}>
                                        {step.description}
                                    </p>
                                    <p style={{
                                        margin: 0,
                                        color: isDark ? '#999' : '#666',
                                        fontSize: '12px',
                                    }}>
                                        Tool: <code style={{
                                            background: isDark ? '#111' : '#f3f4f6',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            fontFamily: 'monospace',
                                        }}>
                                            {step.tool}
                                        </code>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: isDark ? '#666' : '#999',
                    borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                }}>
                    Analysis generated: {new Date(data.timestamp).toLocaleString()}
                </div>
            </div>
        </div>
    );
}
