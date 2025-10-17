import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { scrollToTop, scrollToPosition, scrollToElement } from '@/common/utils'

describe('utils', () => {
  describe('scrollToTop', () => {
    beforeEach(() => {
      // Mock window.scrollTo
      window.scrollTo = vi.fn()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should scroll to top with default behavior', () => {
      scrollToTop()
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    })

    it('should scroll to top with smooth behavior', () => {
      scrollToTop('smooth')
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })

    it('should scroll to top with instant behavior', () => {
      scrollToTop('instant')
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    })
  })

  describe('scrollToPosition', () => {
    beforeEach(() => {
      window.scrollTo = vi.fn()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should scroll to specified position with default smooth behavior', () => {
      scrollToPosition(500)
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 500,
        left: 0,
        behavior: 'smooth'
      })
    })

    it('should scroll to position with auto behavior', () => {
      scrollToPosition(1000, 'auto')
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 1000,
        left: 0,
        behavior: 'auto'
      })
    })

    it('should handle zero position', () => {
      scrollToPosition(0)
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })

    it('should handle negative position', () => {
      scrollToPosition(-100)
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: -100,
        left: 0,
        behavior: 'smooth'
      })
    })
  })

  describe('scrollToElement', () => {
    let mockElement: HTMLElement

    beforeEach(() => {
      mockElement = document.createElement('div')
      mockElement.scrollIntoView = vi.fn()
      document.body.appendChild(mockElement)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      vi.restoreAllMocks()
    })

    it('should scroll to HTML element with default smooth behavior', () => {
      scrollToElement(mockElement)
      
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      })
    })

    it('should scroll to element by selector', () => {
      mockElement.id = 'test-element'
      document.querySelector = vi.fn().mockReturnValue(mockElement)
      
      scrollToElement('#test-element')
      
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      })
    })

    it('should scroll to element with auto behavior', () => {
      scrollToElement(mockElement, 'auto')
      
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'auto',
        block: 'start'
      })
    })

    it('should handle non-existent element selector gracefully', () => {
      document.querySelector = vi.fn().mockReturnValue(null)
      
      expect(() => {
        scrollToElement('#non-existent')
      }).not.toThrow()
    })

    it('should not throw error when element is null', () => {
      document.querySelector = vi.fn().mockReturnValue(null)
      
      expect(() => {
        scrollToElement('.missing-class', 'smooth')
      }).not.toThrow()
    })
  })
})

