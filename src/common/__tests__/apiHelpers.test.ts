import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { 
  apiDelay, 
  createApiErrorHandler, 
  handleFetchError, 
  fetchWithErrorHandling 
} from '@/common/apiHelpers'

describe('apiHelpers', () => {
  describe('apiDelay', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should delay for fixed time when only min is provided', async () => {
      const delayPromise = apiDelay(300)
      vi.advanceTimersByTime(300)
      await expect(delayPromise).resolves.toBeUndefined()
    })

    it('should delay for random time between min and max', async () => {
      const delayPromise = apiDelay(100, 500)
      vi.advanceTimersByTime(500)
      await expect(delayPromise).resolves.toBeUndefined()
    })

    it('should handle zero delay', async () => {
      const delayPromise = apiDelay(0)
      vi.advanceTimersByTime(0)
      await expect(delayPromise).resolves.toBeUndefined()
    })
  })

  describe('createApiErrorHandler', () => {
    it('should return data on successful API call', async () => {
      const mockData = { id: 1, name: 'Test' }
      const mockApiCall = vi.fn().mockResolvedValue(mockData)
      
      const handler = createApiErrorHandler(mockApiCall, 'Error message')
      const result = await handler()
      
      expect(result).toEqual({ data: mockData })
      expect(mockApiCall).toHaveBeenCalledTimes(1)
    })

    it('should return error object when API call fails', async () => {
      const mockError = new Error('Network error')
      const mockApiCall = vi.fn().mockRejectedValue(mockError)
      
      const handler = createApiErrorHandler(mockApiCall, 'Custom error')
      const result = await handler()
      
      expect(result).toEqual({
        error: {
          status: 'CUSTOM_ERROR',
          error: 'Network error'
        }
      })
    })

    it('should use default error message for non-Error objects', async () => {
      const mockApiCall = vi.fn().mockRejectedValue('String error')
      
      const handler = createApiErrorHandler(mockApiCall, 'Default error')
      const result = await handler()
      
      expect(result).toEqual({
        error: {
          status: 'CUSTOM_ERROR',
          error: 'Default error'
        }
      })
    })
  })

  describe('handleFetchError', () => {
    it('should not throw error when response is ok', () => {
      const mockResponse = { ok: true } as Response
      
      expect(() => {
        handleFetchError(mockResponse, 'Error message')
      }).not.toThrow()
    })

    it('should throw error when response is not ok', () => {
      const mockResponse = { ok: false } as Response
      
      expect(() => {
        handleFetchError(mockResponse, 'Custom error message')
      }).toThrow('Custom error message')
    })

    it('should throw error with correct message', () => {
      const mockResponse = { ok: false } as Response
      const errorMessage = 'Failed to fetch data'
      
      expect(() => {
        handleFetchError(mockResponse, errorMessage)
      }).toThrow(errorMessage)
    })
  })

  describe('fetchWithErrorHandling', () => {
    const mockFetch = vi.fn()
    
    beforeEach(() => {
      global.fetch = mockFetch
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should return parsed JSON on successful fetch', async () => {
      const mockData = { id: 1, name: 'Test Product' }
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData)
      })
      
      const result = await fetchWithErrorHandling('/api/products', 'Error')
      
      expect(result).toEqual(mockData)
      expect(mockFetch).toHaveBeenCalledWith('/api/products')
    })

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: vi.fn()
      })
      
      await expect(
        fetchWithErrorHandling('/api/products', 'Failed to load')
      ).rejects.toThrow('Failed to load')
    })

    it('should use default error message when not provided', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: vi.fn()
      })
      
      await expect(
        fetchWithErrorHandling('/api/test')
      ).rejects.toThrow('Помилка завантаження даних')
    })

    it('should handle JSON parsing errors', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON'))
      })
      
      await expect(
        fetchWithErrorHandling('/api/products')
      ).rejects.toThrow('Invalid JSON')
    })
  })
})

