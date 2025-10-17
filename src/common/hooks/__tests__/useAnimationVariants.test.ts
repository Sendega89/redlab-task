import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAnimationVariants } from '@/common/hooks/useAnimationVariants'

describe('useAnimationVariants', () => {
  describe('default configuration', () => {
    it('should return all variant objects', () => {
      const { result } = renderHook(() => useAnimationVariants())
      
      expect(result.current).toHaveProperty('containerVariants')
      expect(result.current).toHaveProperty('itemVariants')
      expect(result.current).toHaveProperty('fadeInVariants')
      expect(result.current).toHaveProperty('scaleInVariants')
      expect(result.current).toHaveProperty('slideInVariants')
    })

    it('should have correct default containerVariants structure', () => {
      const { result } = renderHook(() => useAnimationVariants())
      
      expect(result.current.containerVariants).toMatchObject({
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.15
          }
        }
      })
    })

    it('should have correct default itemVariants structure', () => {
      const { result } = renderHook(() => useAnimationVariants())
      
      expect(result.current.itemVariants).toMatchObject({
        hidden: { y: 30, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            damping: 15,
            stiffness: 100
          }
        }
      })
    })

    it('should have correct fadeInVariants structure', () => {
      const { result } = renderHook(() => useAnimationVariants())
      
      expect(result.current.fadeInVariants).toMatchObject({
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5
          }
        }
      })
    })

    it('should have correct scaleInVariants structure', () => {
      const { result } = renderHook(() => useAnimationVariants())
      
      expect(result.current.scaleInVariants).toMatchObject({
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            damping: 20,
            stiffness: 100
          }
        }
      })
    })

    it('should have correct slideInVariants structure', () => {
      const { result } = renderHook(() => useAnimationVariants())
      
      expect(result.current.slideInVariants).toMatchObject({
        hidden: { x: -20, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            damping: 15,
            stiffness: 100
          }
        }
      })
    })
  })

  describe('custom configuration', () => {
    it('should use custom delayChildren', () => {
      const { result } = renderHook(() => 
        useAnimationVariants({ delayChildren: 0.5 })
      )
      
      expect(result.current.containerVariants.visible.transition.delayChildren).toBe(0.5)
    })

    it('should use custom staggerChildren', () => {
      const { result } = renderHook(() => 
        useAnimationVariants({ staggerChildren: 0.3 })
      )
      
      expect(result.current.containerVariants.visible.transition.staggerChildren).toBe(0.3)
    })

    it('should use custom itemY', () => {
      const { result } = renderHook(() => 
        useAnimationVariants({ itemY: 50 })
      )
      
      expect(result.current.itemVariants.hidden.y).toBe(50)
    })

    it('should use custom damping', () => {
      const { result } = renderHook(() => 
        useAnimationVariants({ damping: 20 })
      )
      
      expect(result.current.itemVariants.visible.transition.damping).toBe(20)
    })

    it('should use custom stiffness', () => {
      const { result } = renderHook(() => 
        useAnimationVariants({ stiffness: 200 })
      )
      
      expect(result.current.itemVariants.visible.transition.stiffness).toBe(200)
    })

    it('should accept multiple custom config values', () => {
      const config = {
        delayChildren: 0.4,
        staggerChildren: 0.25,
        itemY: 60,
        damping: 18,
        stiffness: 150
      }
      
      const { result } = renderHook(() => useAnimationVariants(config))
      
      expect(result.current.containerVariants.visible.transition.delayChildren).toBe(0.4)
      expect(result.current.containerVariants.visible.transition.staggerChildren).toBe(0.25)
      expect(result.current.itemVariants.hidden.y).toBe(60)
      expect(result.current.itemVariants.visible.transition.damping).toBe(18)
      expect(result.current.itemVariants.visible.transition.stiffness).toBe(150)
    })
  })

  describe('memoization', () => {
    it('should return same object references when config does not change', () => {
      const config = { delayChildren: 0.3 }
      const { result, rerender } = renderHook(() => useAnimationVariants(config))
      
      const firstRenderVariants = result.current
      
      rerender()
      
      const secondRenderVariants = result.current
      
      expect(firstRenderVariants.containerVariants).toBe(secondRenderVariants.containerVariants)
      expect(firstRenderVariants.itemVariants).toBe(secondRenderVariants.itemVariants)
      expect(firstRenderVariants.fadeInVariants).toBe(secondRenderVariants.fadeInVariants)
      expect(firstRenderVariants.scaleInVariants).toBe(secondRenderVariants.scaleInVariants)
      expect(firstRenderVariants.slideInVariants).toBe(secondRenderVariants.slideInVariants)
    })

    it('should return new object when config changes', () => {
      const { result, rerender } = renderHook(
        ({ delayChildren }) => useAnimationVariants({ delayChildren }),
        { initialProps: { delayChildren: 0.2 } }
      )
      
      const firstRenderVariants = result.current.containerVariants
      
      rerender({ delayChildren: 0.5 })
      
      const secondRenderVariants = result.current.containerVariants
      
      expect(firstRenderVariants).not.toBe(secondRenderVariants)
    })
  })

  describe('edge cases', () => {
    it('should handle zero values in config', () => {
      const config = {
        delayChildren: 0,
        staggerChildren: 0,
        itemY: 0,
        damping: 0,
        stiffness: 0
      }
      
      const { result } = renderHook(() => useAnimationVariants(config))
      
      expect(result.current.containerVariants.visible.transition.delayChildren).toBe(0)
      expect(result.current.itemVariants.hidden.y).toBe(0)
    })

    it('should handle negative itemY value', () => {
      const { result } = renderHook(() => 
        useAnimationVariants({ itemY: -50 })
      )
      
      expect(result.current.itemVariants.hidden.y).toBe(-50)
    })

    it('should handle very large values', () => {
      const config = {
        delayChildren: 10,
        staggerChildren: 5,
        itemY: 1000,
        damping: 100,
        stiffness: 1000
      }
      
      const { result } = renderHook(() => useAnimationVariants(config))
      
      expect(result.current.containerVariants.visible.transition.delayChildren).toBe(10)
      expect(result.current.itemVariants.hidden.y).toBe(1000)
    })
  })

  describe('type safety', () => {
    it('should work with empty config object', () => {
      const { result } = renderHook(() => useAnimationVariants({}))
      
      expect(result.current.containerVariants).toBeDefined()
      expect(result.current.itemVariants).toBeDefined()
    })

    it('should work with partial config', () => {
      const { result } = renderHook(() => 
        useAnimationVariants({ delayChildren: 0.5, itemY: 40 })
      )
      
      expect(result.current.containerVariants.visible.transition.delayChildren).toBe(0.5)
      expect(result.current.itemVariants.hidden.y).toBe(40)
      // Should use defaults for non-specified values
      expect(result.current.containerVariants.visible.transition.staggerChildren).toBe(0.15)
    })
  })
})

