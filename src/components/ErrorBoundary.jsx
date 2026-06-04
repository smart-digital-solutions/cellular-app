import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-red-200 dark:border-red-900/50 shadow-sm-omega animate-in fade-in zoom-in duration-500 max-w-xl mx-auto my-12 text-center" dir="rtl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
            אופס, משהו השתבש במסך זה
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">
            התרחשה שגיאה בעת טעינת הנתונים או תצוגת הרכיב. שאר המערכת ממשיכה לפעול כרגיל.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
              if (this.props.onReset) this.props.onReset();
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-all hover-lift"
          >
            <RefreshCcw className="w-4 h-4" />
            נסה שנית
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
