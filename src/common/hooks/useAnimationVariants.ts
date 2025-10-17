import { useMemo } from 'react'
import type { Variants } from 'framer-motion'

export interface AnimationConfig {
  /**
   * Затримка перед початком анімації дочірніх елементів
   */
  delayChildren?: number
  
  /**
   * Затримка між анімацією кожного дочірнього елемента
   */
  staggerChildren?: number
  
  /**
   * Згасання по Y для item-анімації
   */
  itemY?: number
  
  /**
   * Damping для spring анімації
   */
  damping?: number
  
  /**
   * Stiffness для spring анімації
   */
  stiffness?: number
}

/**
 * Хук для створення стандартизованих варіантів анімації Framer Motion
 */
export const useAnimationVariants = (config: AnimationConfig = {}) => {
  const {
    delayChildren = 0.2,
    staggerChildren = 0.15,
    itemY = 30,
    damping = 15,
    stiffness = 100
  } = config

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren
      }
    }
  }), [delayChildren, staggerChildren])

  const itemVariants: Variants = useMemo(() => ({
    hidden: { y: itemY, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping,
        stiffness
      }
    }
  }), [itemY, damping, stiffness])

  const fadeInVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }), [])

  const scaleInVariants: Variants = useMemo(() => ({
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness
      }
    }
  }), [stiffness])

  const slideInVariants: Variants = useMemo(() => ({
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping,
        stiffness
      }
    }
  }), [damping, stiffness])

  return {
    containerVariants,
    itemVariants,
    fadeInVariants,
    scaleInVariants,
    slideInVariants
  }
}

