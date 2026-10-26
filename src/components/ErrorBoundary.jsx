import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('FashionFizz Atelier Error Boundary Caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback;

      return (
        <div className="min-h-screen bg-paper text-ink flex items-center justify-center p-6 noise-overlay">
          <div className="max-w-xl w-full bg-paper-surface border border-red-500/50 p-8 rounded-[4px] shadow-[0_24px_64px_rgba(0,0,0,0.8),0_0_0_1px_var(--color-line)] flex flex-col gap-6">
            <div className="flex items-center gap-4 text-red-500">
              <AlertTriangle size={36} />
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Atelier Render Exception</h2>
                <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mt-1">FashionFizz Aura Chromatique System Fault</p>
              </div>
            </div>

            <div className="bg-paper border border-line p-4 rounded-[2px] font-mono text-xs text-red-400 overflow-x-auto max-h-48">
              <p className="font-bold mb-1">{this.state.error && this.state.error.toString()}</p>
              <pre className="text-[10px] text-ink-muted whitespace-pre-wrap">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 bg-brand text-white font-mono text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-[2px] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--color-chrome)] transition-all cursor-pointer"
              >
                <RefreshCw size={16} /> Reinitialize Atelier
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
