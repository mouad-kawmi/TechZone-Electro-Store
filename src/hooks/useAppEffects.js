import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setToast, setView, setActiveCategory } from '../store';

const useAppEffects = (dispatch, { isDarkMode, view, activeCategory, loading, searchQuery, toast, main }) => {
    useEffect(() => {
        const win = window;
        if (win.Lenis) {
            const lenis = new win.Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            });
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            return () => { lenis.destroy(); };
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    useEffect(() => {
        const magnets = document.querySelectorAll('.magnetic');
        magnets.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = el.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            });
        });
    }, [view, loading, searchQuery]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                dispatch(setToast(null));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [toast, dispatch]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!loading) {
                const pageContent = document.querySelector(".page-content");
                if (pageContent) {
                    gsap.fromTo(".page-content",
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
                    );
                }
            }
        }, main);
        return () => ctx.revert();
    }, [view, activeCategory, searchQuery, loading, main]);
};

export default useAppEffects;
