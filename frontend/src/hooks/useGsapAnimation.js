import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useGsapAnimation = () => {
  const heroRef = useRef(null);
  const sectionRefs = useRef([]);

  const addToSectionRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Hero animation
  const animateHero = () => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title span', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    )
    .fromTo('.hero-subtitle',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.hero-buttons',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('.graphic-circle',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.1, duration: 1, stagger: 0.2, ease: 'back.out(1.7)' },
      '-=0.5'
    )
    .fromTo('.graphic-main',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
      '-=0.8'
    );
  };

  // Section reveal animation
  const animateSections = () => {
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      gsap.fromTo(section,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  };

  // Stagger animation for cards
  const staggerAnimation = (selector, delay = 0.1) => {
    gsap.fromTo(selector,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  };

  // Text reveal animation
  const textReveal = (selector) => {
    gsap.fromTo(selector,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: selector,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  };

  // Fade in animation
  const fadeIn = (selector) => {
    gsap.fromTo(selector,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  };

  useEffect(() => {
    // Initialize animations after component mount
    const initAnimations = () => {
      animateHero();
      animateSections();
    };

    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timer);
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    heroRef,
    addToSectionRefs,
    staggerAnimation,
    textReveal,
    fadeIn,
    animateHero,
    animateSections
  };
};