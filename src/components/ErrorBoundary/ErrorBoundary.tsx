import React, { Component, ErrorInfo, ReactNode } from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Error Boundary компонент для перехоплення помилок React
 * Відображає fallback UI замість crash всього додатку
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Оновлюємо стан, щоб наступний рендер показав fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Логуємо помилку в сервіс моніторингу (наприклад, Sentry)
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // TODO: Відправити помилку в сервіс моніторингу
    // Example: Sentry.captureException(error)
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Якщо передано custom fallback - використовуємо його
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Дефолтний fallback UI
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.container}>
            <div className={styles.icon}>⚠️</div>
            <h1 className={styles.title}>Щось пішло не так</h1>
            <p className={styles.message}>
              Виникла непередбачена помилка. Спробуйте оновити сторінку.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.details}>
                <summary className={styles.summary}>
                  Деталі помилки (тільки в режимі розробки)
                </summary>
                <div className={styles.errorDetails}>
                  <p className={styles.errorName}>{this.state.error.toString()}</p>
                  {this.state.errorInfo && (
                    <pre className={styles.errorStack}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className={styles.actions}>
              <button
                className={styles.primaryButton}
                onClick={() => window.location.reload()}
              >
                Оновити сторінку
              </button>
              <button
                className={styles.secondaryButton}
                onClick={this.handleReset}
              >
                Спробувати ще раз
              </button>
              <button
                className={styles.linkButton}
                onClick={() => window.location.href = '/'}
              >
                На головну
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

