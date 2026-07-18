'use client';

import { useTheme, useMaxHeight, useWidgetSDK } from '@nitrostack/widgets';
import { 
    LayoutDashboard, 
    AlertTriangle, 
    Cpu, 
    FileText, 
    Database, 
    Clock, 
    Activity, 
    ShieldAlert, 
    CheckCircle2, 
    Play, 
    Layers,
    DollarSign,
    Zap,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { useState, useEffect } from 'react';

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

export default function ForgeDashboard() {
    const theme = useTheme();
    const maxHeight = useMaxHeight();
    const isDark = theme === 'dark';

    const { isReady, getToolOutput, callTool } = useWidgetSDK();
    const initialData = getToolOutput<DecisionTwinData>();

    const [currentTime, setCurrentTime] = useState<string>('14:32:10 UTC');
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dashboardData, setDashboardData] = useState<DecisionTwinData | null>(null);
    const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);

    useEffect(() => {
        setCurrentTime(new Date().toLocaleTimeString());
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (initialData) {
            setDashboardData(initialData);
        }
    }, [initialData]);

    const handleAnalyzeIncident = async () => {
        setIsLoading(true);
        try {
            const response = await callTool('analyze_incident', {});
            console.log('Analyze Incident response:', response);
            
            let data: any = null;
            if (response && typeof response === 'object') {
                if ('structuredContent' in response && response.structuredContent) {
                    data = response.structuredContent;
                } else if ('data' in response && response.data) {
                    data = response.data;
                } else if ('executiveSummary' in response) {
                    data = response;
                } else if ('content' in response && Array.isArray(response.content)) {
                    const textContent = response.content.find((c: any) => c.type === 'text')?.text;
                    if (textContent) {
                        try {
                            data = JSON.parse(textContent);
                        } catch (e) {
                            console.error('Failed to parse text content as JSON:', e);
                        }
                    }
                }
            }
            
            if (data && data.executiveSummary) {
                setDashboardData(data);
            } else {
                console.error('Could not extract valid DecisionTwinData from response:', response);
            }
        } catch (error) {
            console.error('Error calling analyze_incident:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity?.toUpperCase()) {
            case 'CRITICAL':
                return '#ef4444';
            case 'HIGH':
                return '#f97316';
            case 'MEDIUM':
                return '#eab308';
            default:
                return '#10b981';
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk?.toLowerCase()) {
            case 'high':
                return '#ef4444';
            case 'medium':
                return '#eab308';
            case 'low':
                return '#10b981';
            default:
                return '#94a3b8';
        }
    };

    // Custom styles for dark industrial theme
    const styles = {
        container: {
            background: '#0d0e12', // Deep industrial charcoal
            color: '#e2e8f0',
            minHeight: '100vh',
            maxHeight: maxHeight || '100vh',
            display: 'flex',
            flexDirection: 'column' as const,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            overflow: 'hidden',
        },
        topNav: {
            background: '#14161d',
            borderBottom: '1px solid #222632',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px',
        },
        logoSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
        },
        logoText: {
            fontSize: '18px',
            fontWeight: '800',
            letterSpacing: '1px',
            color: '#f59e0b', // Industrial Amber
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        statusIndicator: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#10b981',
        },
        statusDot: {
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981',
        },
        factoryInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '13px',
            color: '#94a3b8',
        },
        timeDisplay: {
            background: '#1e2230',
            padding: '4px 12px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            color: '#f59e0b',
            border: '1px solid #2d3346',
        },
        body: {
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
        },
        sidebar: {
            width: '240px',
            background: '#14161d',
            borderRight: '1px solid #222632',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '8px',
        },
        sidebarButton: (active: boolean) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            background: active ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
            color: active ? '#f59e0b' : '#94a3b8',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            textAlign: 'left' as const,
            transition: 'all 0.2s ease',
            borderLeft: active ? '3px solid #f59e0b' : '3px solid transparent',
        }),
        mainContent: {
            flex: 1,
            padding: '24px',
            overflowY: 'auto' as const,
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '24px',
        },
        summaryGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
        },
        summaryCard: {
            background: '#14161d',
            border: '1px solid #222632',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'transform 0.2s ease, border-color 0.2s ease',
            cursor: 'pointer',
        },
        summaryIconWrapper: (color: string) => ({
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: `rgba(${color}, 0.1)`,
            border: `1px solid rgba(${color}, 0.2)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: `rgb(${color})`,
        }),
        summaryLabel: {
            fontSize: '12px',
            color: '#64748b',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
            margin: '0 0 4px 0',
        },
        summaryValue: {
            fontSize: '16px',
            fontWeight: '700',
            color: '#f8fafc',
            margin: 0,
        },
        placeholderGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px',
        },
        placeholderCard: (colSpan: number) => ({
            gridColumn: `span ${colSpan}`,
            background: '#14161d',
            border: '1px solid #222632',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '16px',
            minHeight: '180px',
            position: 'relative' as const,
            overflow: 'hidden',
        }),
        placeholderHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderBottom: '1px solid #222632',
            paddingBottom: '12px',
            margin: 0,
        },
        placeholderTitle: {
            fontSize: '15px',
            fontWeight: '700',
            color: '#f8fafc',
            margin: 0,
        },
        placeholderBody: {
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            border: '1px dashed #2d3346',
            borderRadius: '8px',
            background: 'rgba(20, 22, 29, 0.4)',
            padding: '20px',
            color: '#475569',
            fontSize: '13px',
            textAlign: 'center' as const,
        }
    };

    return (
        <div style={styles.container}>
            {/* Top Navigation */}
            <header style={styles.topNav}>
                <div style={styles.logoSection}>
                    <h1 style={styles.logoText}>
                        <Cpu size={22} />
                        FORGE-OS
                    </h1>
                    <div style={styles.statusIndicator}>
                        <span style={styles.statusDot}></span>
                        CONNECTED
                    </div>
                </div>
                <div style={styles.factoryInfo}>
                    <button 
                        onClick={handleAnalyzeIncident}
                        disabled={isLoading}
                        style={{
                            background: isLoading ? '#475569' : '#f59e0b',
                            color: '#0d0e12',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease',
                            marginRight: '12px',
                        }}
                    >
                        <Play size={14} fill="#0d0e12" />
                        {isLoading ? 'ANALYZING...' : 'ANALYZE INCIDENT'}
                    </button>
                    <span>🏭 QuadCore Assembly Plant 4</span>
                    <span style={styles.timeDisplay}>🕒 {currentTime}</span>
                </div>
            </header>

            {/* Body */}
            <div style={styles.body}>
                {/* Left Sidebar */}
                <aside style={styles.sidebar}>
                    <button 
                        style={styles.sidebarButton(activeTab === 'dashboard')}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>
                    <button 
                        style={styles.sidebarButton(activeTab === 'incidents')}
                        onClick={() => setActiveTab('incidents')}
                    >
                        <AlertTriangle size={18} />
                        Incidents
                    </button>
                    <button 
                        style={styles.sidebarButton(activeTab === 'decision-twin')}
                        onClick={() => setActiveTab('decision-twin')}
                    >
                        <Activity size={18} />
                        Decision Twin
                    </button>
                    <button 
                        style={styles.sidebarButton(activeTab === 'resources')}
                        onClick={() => setActiveTab('resources')}
                    >
                        <Database size={18} />
                        Resources
                    </button>
                    <button 
                        style={styles.sidebarButton(activeTab === 'reports')}
                        onClick={() => setActiveTab('reports')}
                    >
                        <FileText size={18} />
                        Reports
                    </button>
                </aside>

                {/* Main Dashboard Content */}
                <main style={styles.mainContent}>
                    {/* Summary Cards */}
                    <section style={styles.summaryGrid}>
                        {/* Machine Card */}
                        <div style={styles.summaryCard}>
                            <div style={styles.summaryIconWrapper('245, 158, 11')}>
                                <Cpu size={22} />
                            </div>
                            <div>
                                <p style={styles.summaryLabel}>Machine</p>
                                <p style={styles.summaryValue}>{dashboardData?.incident?.machine ?? 'CNC-MILL-04'}</p>
                            </div>
                        </div>

                        {/* Production Line Card */}
                        <div style={styles.summaryCard}>
                            <div style={styles.summaryIconWrapper('59, 130, 246')}>
                                <Layers size={22} />
                            </div>
                            <div>
                                <p style={styles.summaryLabel}>Production Line</p>
                                <p style={styles.summaryValue}>{dashboardData?.incident?.productionLine ?? 'Line 3 (Automotive)'}</p>
                            </div>
                        </div>

                        {/* Incident Severity Card */}
                        <div style={styles.summaryCard}>
                            <div style={styles.summaryIconWrapper('239, 68, 68')}>
                                <ShieldAlert size={22} />
                            </div>
                            <div>
                                <p style={styles.summaryLabel}>Incident Severity</p>
                                <p style={{ 
                                    ...styles.summaryValue, 
                                    color: getSeverityColor(dashboardData?.incident?.severity ?? 'CRITICAL') 
                                }}>
                                    {dashboardData?.incident?.severity ?? 'CRITICAL'}
                                </p>
                            </div>
                        </div>

                        {/* Current Status Card */}
                        <div style={styles.summaryCard}>
                            <div style={styles.summaryIconWrapper('16, 185, 129')}>
                                <CheckCircle2 size={22} />
                            </div>
                            <div>
                                <p style={styles.summaryLabel}>Current Status</p>
                                <p style={{ ...styles.summaryValue, color: '#10b981' }}>
                                    {dashboardData ? 'ANALYZED' : 'PENDING'}
                                </p>
                            </div>
                        </div>

                        {/* Detection Time Card */}
                        <div style={styles.summaryCard}>
                            <div style={styles.summaryIconWrapper('139, 92, 246')}>
                                <Clock size={22} />
                            </div>
                            <div>
                                <p style={styles.summaryLabel}>Detection Time</p>
                                <p style={styles.summaryValue}>
                                    {dashboardData?.incident?.detectedAt 
                                        ? new Date(dashboardData.incident.detectedAt).toLocaleTimeString() 
                                        : '14:32:10 UTC'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Placeholder Sections Grid */}
                    <section style={styles.placeholderGrid}>
                        {/* 1. Executive Summary */}
                        <div style={styles.placeholderCard(12)}>
                            <h3 style={styles.placeholderHeader}>
                                <FileText size={18} color="#f59e0b" />
                                <span style={styles.placeholderTitle}>1. Executive Summary</span>
                            </h3>
                            {dashboardData ? (
                                <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1' }}>
                                    {dashboardData.executiveSummary}
                                </div>
                            ) : (
                                <div style={styles.placeholderBody}>
                                    <p style={{ margin: 0 }}>Executive Summary Placeholder</p>
                                </div>
                            )}
                        </div>

                        {/* 2. Incident Details */}
                        <div style={styles.placeholderCard(6)}>
                            <h3 style={styles.placeholderHeader}>
                                <ShieldAlert size={18} color="#ef4444" />
                                <span style={styles.placeholderTitle}>2. Incident Details</span>
                            </h3>
                            {dashboardData ? (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Incident ID</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.incident.incidentId}</p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Machine</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.incident.machine}</p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Production Line</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.incident.productionLine}</p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Fault</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.incident.fault}</p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Error Code</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.incident.detectedError}</p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Severity</p>
                                        <p style={{ margin: 0, color: getSeverityColor(dashboardData.incident.severity), fontWeight: '600' }}>{dashboardData.incident.severity}</p>
                                    </div>
                                </div>
                            ) : (
                                <div style={styles.placeholderBody}>
                                    <p style={{ margin: 0 }}>Incident Details Placeholder</p>
                                </div>
                            )}
                        </div>

                        {/* 3. Analysis */}
                        <div style={styles.placeholderCard(6)}>
                            <h3 style={styles.placeholderHeader}>
                                <Activity size={18} color="#3b82f6" />
                                <span style={styles.placeholderTitle}>3. Analysis</span>
                            </h3>
                            {dashboardData ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Root Cause</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.analysis.rootCause}</p>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                        <div>
                                            <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px' }}>Temperature</p>
                                            <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.analysis.machineTemperature}</p>
                                        </div>
                                        <div>
                                            <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px' }}>Pressure</p>
                                            <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.analysis.coolantPressure}</p>
                                        </div>
                                        <div>
                                            <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px' }}>Vibration</p>
                                            <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.analysis.vibrationLevel}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Evidence</p>
                                        <ul style={{ margin: 0, paddingLeft: '16px', color: '#cbd5e1', fontSize: '12px' }}>
                                            {(dashboardData.analysis.evidence ?? []).slice(0, 3).map((item, idx) => (
                                                <li key={idx} style={{ marginBottom: '2px' }}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div style={styles.placeholderBody}>
                                    <p style={{ margin: 0 }}>Analysis Placeholder</p>
                                </div>
                            )}
                        </div>

                        {/* 4. Business Impact */}
                        <div style={styles.placeholderCard(4)}>
                            <h3 style={styles.placeholderHeader}>
                                <DollarSign size={18} color="#10b981" />
                                <span style={styles.placeholderTitle}>4. Business Impact</span>
                            </h3>
                            {dashboardData ? (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Estimated Loss</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '700', fontSize: '15px' }}>
                                            ${(dashboardData.businessImpact.estimatedLoss ?? 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Cost / Hour</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '700', fontSize: '15px' }}>
                                            ${(dashboardData.businessImpact.downtimeCostPerHour ?? 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Affected Orders</p>
                                        <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>
                                            {dashboardData.businessImpact.affectedOrders}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Priority</p>
                                        <p style={{ margin: 0, color: '#f59e0b', fontWeight: '600' }}>
                                            {dashboardData.businessImpact.productionPriority}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div style={styles.placeholderBody}>
                                    <p style={{ margin: 0 }}>Business Impact Placeholder</p>
                                </div>
                            )}
                        </div>

                        {/* 5. Recovery Strategies */}
                        <div style={styles.placeholderCard(8)}>
                            <h3 style={styles.placeholderHeader}>
                                <Zap size={18} color="#8b5cf6" />
                                <span style={styles.placeholderTitle}>5. Recovery Strategies</span>
                            </h3>
                            {dashboardData ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '180px' }}>
                                    {(dashboardData.decisionTwinSimulation ?? []).map((strategy, idx) => (
                                        <div key={idx} style={{
                                            background: '#1e2230',
                                            border: '1px solid #2d3346',
                                            borderRadius: '8px',
                                            padding: '10px 12px',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: '600', fontSize: '13px', color: '#f8fafc' }}>{strategy.strategy}</span>
                                                <span style={{ fontSize: '11px', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                                                    {strategy.confidence}% confidence
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#94a3b8' }}>
                                                <span>⏱️ {strategy.downtime}</span>
                                                <span>💰 ${strategy.estimatedCost.toLocaleString()}</span>
                                                <span style={{ color: getRiskColor(strategy.operationalRisk) }}>⚠️ {strategy.operationalRisk} Risk</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={styles.placeholderBody}>
                                    <p style={{ margin: 0 }}>Recovery Strategies Placeholder</p>
                                </div>
                            )}
                        </div>

                        {/* 6. Recommended Strategy */}
                        <div style={styles.placeholderCard(6)}>
                            <h3 style={styles.placeholderHeader}>
                                <CheckCircle2 size={18} color="#10b981" />
                                <span style={styles.placeholderTitle}>6. Recommended Strategy</span>
                            </h3>
                            {dashboardData ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                                    <h4 style={{ margin: 0, color: '#10b981', fontSize: '14px', fontWeight: '700' }}>
                                        {dashboardData.recommendation.selectedStrategy}
                                    </h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#1e2230', padding: '10px', borderRadius: '6px' }}>
                                        <div>
                                            <p style={{ margin: '0 0 2px 0', color: '#64748b', fontSize: '10px' }}>EXPECTED DOWNTIME</p>
                                            <p style={{ margin: 0, color: '#f8fafc', fontWeight: '600' }}>{dashboardData.recommendation.expectedOutcome?.expectedDowntime}</p>
                                        </div>
                                        <div>
                                            <p style={{ margin: '0 0 2px 0', color: '#64748b', fontSize: '10px' }}>ESTIMATED SAVINGS</p>
                                            <p style={{ margin: 0, color: '#10b981', fontWeight: '600' }}>${(dashboardData.recommendation.expectedOutcome?.estimatedSavings ?? 0).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>Reasoning</p>
                                        <ul style={{ margin: 0, paddingLeft: '16px', color: '#cbd5e1', fontSize: '12px' }}>
                                            {(dashboardData.recommendation.reasoning ?? []).slice(0, 2).map((reason, idx) => (
                                                <li key={idx} style={{ marginBottom: '2px' }}>{reason}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div style={styles.placeholderBody}>
                                    <p style={{ margin: 0 }}>Recommended Strategy Placeholder</p>
                                </div>
                            )}
                        </div>

                        {/* 7. Execution Plan */}
                        <div style={styles.placeholderCard(6)}>
                            <h3 style={styles.placeholderHeader}>
                                <Play size={18} color="#f59e0b" />
                                <span style={styles.placeholderTitle}>7. Execution Plan</span>
                            </h3>
                            {dashboardData ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '180px' }}>
                                    {(dashboardData.executionPlan ?? []).map((step, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                                            <div style={{
                                                minWidth: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: '#f59e0b',
                                                color: '#0d0e12',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '11px',
                                                fontWeight: '700',
                                                marginTop: '2px',
                                            }}>
                                                {step.step}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: '#f8fafc', fontWeight: '600' }}>
                                                    {step.description}
                                                </p>
                                                <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>
                                                    Tool: <code style={{ background: '#1e2230', padding: '1px 4px', borderRadius: '3px', fontFamily: 'monospace' }}>{step.tool}</code>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={styles.placeholderBody}>
                                    <p style={{ margin: 0 }}>Execution Plan Placeholder</p>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
