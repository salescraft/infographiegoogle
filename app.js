// App.jsx - Interactive Infographic
// Note: The line "import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';" has been removed
// as React and its hooks will be available globally via CDN.

// Define colors and theme styles outside the App component for better performance
const COLORS = {
    yellow: '#fce552',
    coral: '#fc7862',
    blue: '#829aff',
    mint: '#c6fbcf',
    darkText: '#2D3748', // This will be used as "black" for section headers
    lightBg: '#ffffff',
    lightGray: '#e2e8f0',
    mediumGray: '#475569',
    darkGray: '#334155',
};

const THEME_STYLES = {
    light: {
        bodyBg: COLORS.mint,
        mainContainerBg: COLORS.lightBg,
        mainContainerText: COLORS.darkText,
        introBoxBg: COLORS.yellow,
        introBoxBorder: COLORS.darkText,
        introBoxShadow: `8px 8px 0px ${COLORS.darkText}`,
        introBoxText: COLORS.darkText,
        dataVizBg: COLORS.lightBg,
        dataVizText: COLORS.darkText,
        tocBg: 'rgba(255, 255, 255, 0.98)',
        tocText: COLORS.mediumGray,
        tocHoverBg: '#E2E8F0',
        tocActiveBg: COLORS.mint,
        tocActiveText: COLORS.darkText,
        sectionTitleText: COLORS.darkText, 
        chartTrackBg: COLORS.lightGray,
        sourcesBg: COLORS.lightBg,
        sourcesText: COLORS.darkText,
        border: COLORS.darkText,
        shadow: `8px 8px 0px ${COLORS.darkText}`,
        progressBar: COLORS.blue,
        logoCloud: COLORS.mint, 
        logoLightningText: COLORS.coral, 
        iconColor: COLORS.darkText, 
        footerBg: COLORS.yellow,
        footerText: COLORS.darkText,
        footerBorder: COLORS.darkText,
        footerShadow: `8px 8px 0px ${COLORS.darkText}`,
        modalBg: COLORS.lightBg,
        modalText: COLORS.darkText,
        buttonPrimaryBg: COLORS.blue,
        buttonPrimaryText: COLORS.lightBg,
    },
    dark: {
        bodyBg: COLORS.darkText,
        mainContainerBg: COLORS.darkGray,
        mainContainerText: COLORS.mint,
        introBoxBg: COLORS.mediumGray,
        introBoxBorder: COLORS.darkText,
        introBoxShadow: `8px 8px 0px ${COLORS.darkText}`,
        introBoxText: COLORS.mint,
        dataVizBg: COLORS.darkGray,
        dataVizText: COLORS.mint,
        tocBg: 'rgba(51, 65, 85, 0.98)',
        tocText: COLORS.mint,
        tocHoverBg: COLORS.mediumGray,
        tocActiveBg: COLORS.mediumGray,
        tocActiveText: COLORS.yellow,
        sectionTitleText: COLORS.darkText, 
        chartTrackBg: COLORS.mediumGray,
        sourcesBg: COLORS.darkGray,
        sourcesText: COLORS.mint,
        border: COLORS.darkText,
        shadow: `8px 8px 0px ${COLORS.darkText}`,
        progressBar: COLORS.blue,
        logoCloud: COLORS.mediumGray, 
        logoLightningText: COLORS.yellow, 
        iconColor: COLORS.mint, 
        footerBg: COLORS.mediumGray,
        footerText: COLORS.mint,
        footerBorder: COLORS.darkText,
        footerShadow: `8px 8px 0px ${COLORS.darkText}`,
        modalBg: COLORS.darkGray,
        modalText: COLORS.mint,
        buttonPrimaryBg: COLORS.blue,
        buttonPrimaryText: COLORS.lightBg,
    }
};

// --- SVG Icon Components (Memoized) ---
const IconBase = ({ children, className = "w-8 h-8 mr-4 shrink-0", fill = "none", stroke = "currentColor", strokeWidth = "2", viewBox = "0 0 24 24", style }) => (
    <svg className={className} fill={fill} stroke={stroke} strokeWidth={strokeWidth} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" style={style}>
        {children}
    </svg>
);

const IconIntro = React.memo((props) => <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></IconBase>);
const IconShift = React.memo((props) => <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></IconBase>);
const IconChallenges = React.memo((props) => <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></IconBase>);
const IconOpportunities = React.memo((props) => <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></IconBase>);
const IconStrategies = React.memo((props) => <IconBase {...props} fill="currentColor" stroke="none"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></IconBase>);
const IconSolutions = React.memo((props) => <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4.222 4.222l.707.707M3 12H2m-.636-1.636l.707-.707M12 20v1m6.364-1.636l-.707-.707m-1.414-11.314L12 2.586l-1.414 1.414m0 0L9.172 5.414M12 21.414l1.414-1.414m0 0l1.414-1.414M18 10a8 8 0 11-16 0 8 8 0 0116 0z"></path></IconBase>);
const IconTakeaways = React.memo((props) => <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></IconBase>);
const IconConclusion = React.memo((props) => <IconBase {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></IconBase>);

// --- Small Icon Components for TOC (Memoized) ---
const IconTocBase = ({ children, className = "w-5 h-5 mr-2 shrink-0", fill = "none", stroke = "currentColor", strokeWidth = "2", viewBox = "0 0 24 24" }) => (
    <svg className={className} fill={fill} stroke={stroke} strokeWidth={strokeWidth} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        {children}
    </svg>
);
const IconTocIntro = React.memo(() => <IconTocBase><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></IconTocBase>);
const IconTocShift = React.memo(() => <IconTocBase><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></IconTocBase>);
const IconTocChallenges = React.memo(() => <IconTocBase><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></IconTocBase>);
const IconTocOpportunities = React.memo(() => <IconTocBase><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></IconTocBase>);
const IconTocStrategies = React.memo(() => <IconTocBase fill="currentColor" stroke="none"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></IconTocBase>);
const IconTocSolutions = React.memo(() => <IconTocBase><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4.222 4.222l.707.707M3 12H2m-.636-1.636l.707-.707M12 20v1m6.364-1.636l-.707-.707m-1.414-11.314L12 2.586l-1.414 1.414m0 0L9.172 5.414M12 21.414l1.414-1.414m0 0l1.414-1.414M18 10a8 8 0 11-16 0 8 8 0 0116 0z"></path></IconTocBase>);
const IconTocTakeaways = React.memo(() => <IconTocBase><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></IconTocBase>);
const IconTocConclusion = React.memo(() => <IconTocBase><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></IconTocBase>);


// --- Modal Component ---
const Modal = React.memo(({ message, onClose, visible, currentThemeStyles }) => {
    if (!visible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div 
                className="p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full"
                style={{ backgroundColor: currentThemeStyles.modalBg, color: currentThemeStyles.modalText, border: `2px solid ${COLORS.darkText}` }}
            >
                <p className="text-lg mb-6">{message}</p>
                <button 
                    onClick={onClose} 
                    className="w-full button-solid"
                    style={{ '--button-bg-color': currentThemeStyles.buttonPrimaryBg, color: currentThemeStyles.buttonPrimaryText, borderColor: COLORS.darkText }}
                >
                    OK
                </button>
            </div>
        </div>
    );
});

// --- Section Component (Memoized) ---
const Section = React.memo(({ id, title, icon, children, bgColor, activeSections, toggleSection, currentThemeStyles }) => {
    const isActive = !!activeSections[id];
    const sectionRef = React.useRef(null); // Prefixed with React.
    const actualTitleTextColor = COLORS.darkText; 

    React.useEffect(() => { // Prefixed with React.
        if (isActive && sectionRef.current) {
            sectionRef.current.querySelectorAll('.chart-bar').forEach(bar => {
                const targetWidth = bar.dataset.width;
                bar.style.width = '0%'; 
                setTimeout(() => bar.style.width = targetWidth + '%', 100); 
            });
        }
    }, [isActive]);

    // Clone the icon and pass the style prop to it
    const ClonedIcon = React.cloneElement(icon, { style: { color: actualTitleTextColor, stroke: actualTitleTextColor, fill: icon.props.fill === 'currentColor' ? actualTitleTextColor : icon.props.fill } });


    return (
        <div
            id={id}
            className={`section-container rounded-2xl overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
                border: `2px solid ${COLORS.darkText}`, boxShadow: `8px 8px 0px ${COLORS.darkText}`,
                backgroundColor: currentThemeStyles.dataVizBg,
            }}
        >
            <h2
                className={`section-title flex items-center justify-between p-6 cursor-pointer font-bold transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-xl h-28`} 
                onClick={() => toggleSection(id)}
                style={{
                    backgroundColor: bgColor, color: actualTitleTextColor, 
                    borderRadius: isActive ? '1rem 1rem 0 0' : '1rem', marginBottom: '-2px', 
                    position: 'relative', zIndex: 1,
                }}
                aria-expanded={isActive}
                aria-controls={`content-${id}`}
            >
                <span className="flex items-center">
                    {ClonedIcon}
                    {title}
                </span>
                <span className={`arrow-icon text-3xl transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} style={{ color: actualTitleTextColor }}>&#9658;</span>
            </h2>
            <div
                id={`content-${id}`}
                className={`section-content transition-all duration-800 ease-in-out overflow-hidden ${isActive ? 'max-h-[5000px] p-6 sm:p-8' : 'max-h-0 p-0'}`}
                ref={sectionRef}
                style={{
                    backgroundColor: currentThemeStyles.dataVizBg,
                    color: currentThemeStyles.dataVizText,
                    borderRadius: '0 0 1rem 1rem', 
                    paddingTop: isActive ? '1.5rem' : '0', 
                    paddingBottom: isActive ? '1.5rem' : '0',
                }}
                role="region"
                aria-labelledby={id}
            >
                {children}
            </div>
        </div>
    );
});

// --- ChartBar Component (Memoized) ---
const ChartBar = React.memo(({ label, value, width, barColor, currentThemeStyles }) => (
    <div className="chart-bar-container flex items-center mb-3">
        <span className="chart-bar-label font-bold flex-shrink-0 whitespace-nowrap mr-2 text-sm sm:text-base" style={{ color: currentThemeStyles.dataVizText }}>{label} :</span>
        <div className="chart-bar-track flex-grow rounded-full h-7 overflow-hidden relative" style={{ backgroundColor: currentThemeStyles.chartTrackBg }}>
            <div
                className="chart-bar h-full rounded-full flex items-center justify-end text-white font-semibold text-sm pr-2 transition-all duration-1500 ease-out"
                style={{ width: `0%`, backgroundColor: barColor }} 
                data-width={width} 
            >
                <span>{value}</span>
            </div>
        </div>
    </div>
));

// --- Footer Component (Memoized) ---
const Footer = React.memo(({ currentThemeStyles }) => (
    <footer
        className="mt-12 p-8 rounded-2xl text-center transition-colors duration-500"
        style={{
            backgroundColor: currentThemeStyles.footerBg, color: currentThemeStyles.footerText,
            border: `2px solid ${currentThemeStyles.footerBorder}`, boxShadow: currentThemeStyles.footerShadow,
        }}>
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <a href="#section-intro" className="hover:underline font-semibold" style={{ color: currentThemeStyles.footerText }}>Introduction</a>
                <span className="hidden sm:inline" style={{ color: currentThemeStyles.footerText }}>|</span>
                <a href="#section-strategies" className="hover:underline font-semibold" style={{ color: currentThemeStyles.footerText }}>Stratégies</a>
                <span className="hidden sm:inline" style={{ color: currentThemeStyles.footerText }}>|</span>
                <a href="#section-solutions" className="hover:underline font-semibold" style={{ color: currentThemeStyles.footerText }}>Solutions</a>
                <span className="hidden sm:inline" style={{ color: currentThemeStyles.footerText }}>|</span>
                <a href="#section-takeaways" className="hover:underline font-semibold" style={{ color: currentThemeStyles.footerText }}>Synthèse</a>
            </div>
            <p className="text-sm mb-4">
                © {new Date().getFullYear()} Salescraft. Tous droits réservés.
            </p>
            <p className="text-sm">
                Conçu avec <span role="img" aria-label="cœur">❤️</span> pour les leaders B2B SaaS.
            </p>
        </div>
    </footer>
));


// --- Main App component ---
const App = () => {
    const [activeSections, setActiveSections] = React.useState({}); // Prefixed with React.
    const infographicContentRef = React.useRef(null); // Prefixed with React.
    const [progressBarWidth, setProgressBarWidth] = React.useState(0); // Prefixed with React.
    const [showToc, setShowToc] = React.useState(false); // Prefixed with React.
    const [activeTocItem, setActiveTocItem] = React.useState(''); // Prefixed with React.
    const [theme, setTheme] = React.useState('light'); // Prefixed with React.

    // Modal State
    const [modalVisible, setModalVisible] = React.useState(false); // Prefixed with React.
    const [modalMessage, setModalMessage] = React.useState(''); // Prefixed with React.

    const currentThemeStyles = THEME_STYLES[theme];

    const showModal = React.useCallback((message) => { // Prefixed with React.
        setModalMessage(message);
        setModalVisible(true);
    }, []);

    const closeModal = React.useCallback(() => { // Prefixed with React.
        setModalVisible(false);
        setModalMessage('');
    }, []);

    // Apply body background color based on theme
    React.useEffect(() => { // Prefixed with React.
        document.body.style.backgroundColor = currentThemeStyles.bodyBg;
    }, [currentThemeStyles.bodyBg]); 

    // Scroll and resize listener for progress bar and TOC highlighting
    React.useEffect(() => { // Prefixed with React.
        const updateProgressAndToc = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const scrollPercent = (scrollHeight - clientHeight > 0) ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0;
            setProgressBarWidth(scrollPercent);

            const sections = document.querySelectorAll('.section-container');
            let currentActive = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100; 
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentActive = section.id;
                }
            });
            setActiveTocItem(currentActive);
        };

        window.addEventListener('scroll', updateProgressAndToc);
        window.addEventListener('resize', updateProgressAndToc);
        updateProgressAndToc(); 

        const tocTimer = setTimeout(() => {
            setShowToc(true);
        }, 500);

        return () => {
            window.removeEventListener('scroll', updateProgressAndToc);
            window.removeEventListener('resize', updateProgressAndToc);
            clearTimeout(tocTimer);
        };
    }, []); 

    const toggleSection = React.useCallback((id) => { // Prefixed with React.
        setActiveSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }, []);

    const expandAll = React.useCallback(() => { // Prefixed with React.
        const newActiveSections = {};
        document.querySelectorAll('.section-container').forEach(section => {
            newActiveSections[section.id] = true;
        });
        setActiveSections(newActiveSections);
    }, []);

    const collapseAll = React.useCallback(() => { // Prefixed with React.
        setActiveSections({});
    }, []);

    const exportPdf = React.useCallback(async () => { // Prefixed with React.
        console.log("[PDF Export] Début de l'exportation.");
        const input = infographicContentRef.current;
        console.log("[PDF Export] Élément à exporter:", input);

        if (!input) {
            console.error("[PDF Export] ERREUR: L'élément de contenu PDF est nul.");
            showModal("Erreur : l'élément à exporter en PDF n'a pas été trouvé.");
            return;
        }

        const originalActiveSections = { ...activeSections };
        expandAll(); 
        await new Promise(resolve => setTimeout(resolve, 500)); 

        if (window.html2canvas && window.jspdf && window.jspdf.jsPDF) {
            console.log("[PDF Export] html2canvas et jspdf sont chargés.");
            try {
                const canvas = await window.html2canvas(input, {
                    scale: 2, 
                    useCORS: true,
                    logging: true,
                    backgroundColor: currentThemeStyles.mainContainerBg, 
                    onclone: (doc) => {
                        console.log("[PDF Export - onclone] Clonage du document.");
                        doc.body.style.backgroundColor = currentThemeStyles.bodyBg;
                        const mainContainerClone = doc.querySelector('.main-content-container');
                        if (mainContainerClone) {
                            mainContainerClone.style.backgroundColor = currentThemeStyles.mainContainerBg;
                            mainContainerClone.style.color = currentThemeStyles.mainContainerText;
                        }
                        doc.querySelectorAll('.section-title').forEach(el => {
                            el.style.color = COLORS.darkText; 
                            el.querySelectorAll('svg').forEach(svg => {
                                svg.style.stroke = COLORS.darkText; 
                                if (svg.getAttribute('fill') !== 'none') { 
                                   svg.style.fill = COLORS.darkText; 
                                }
                            });
                        });
                        doc.querySelectorAll('.section-content p, .section-content li, .section-content strong, .section-content span, .section-content div, .data-visualization p, .data-visualization span, .chart-bar-label').forEach(el => {
                             el.style.color = currentThemeStyles.dataVizText;
                        });
                         doc.querySelectorAll('.data-visualization').forEach(el => {
                            el.style.backgroundColor = currentThemeStyles.mainContainerBg; 
                            el.style.border = `1px solid ${currentThemeStyles.border}`;
                        });
                        doc.querySelectorAll('.swot-card').forEach(el => { 
                            el.style.backgroundColor = currentThemeStyles.mainContainerBg;
                            el.style.borderColor = currentThemeStyles.border;
                        });
                        console.log("[PDF Export - onclone] Styles appliqués au clone.");
                    }
                });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save('Google_SGE_Infographie_Salescraft.pdf');
            } catch (error) {
                console.error("[PDF Export] ERREUR lors de la génération du PDF:", error);
                showModal("Une erreur est survenue lors de la génération du PDF. Vérifiez la console.");
            } finally {
                setActiveSections(originalActiveSections); 
            }
        } else {
            showModal("Erreur : html2canvas ou jspdf ne sont pas chargés. Vérifiez la console de votre navigateur.");
            console.error("[PDF Export] ERREUR: html2canvas ou jspdf ne sont pas chargés globalement.");
            setActiveSections(originalActiveSections); 
        }
    }, [activeSections, expandAll, setActiveSections, currentThemeStyles, showModal]); // Dependencies for useCallback

    const shareLinkedin = React.useCallback(() => { // Prefixed with React.
        const pageUrl = window.location.href.startsWith('file:') ? "VOTRE_URL_PUBLIQUE_QUAND_HEBERGE" : window.location.href;
        const url = encodeURIComponent(pageUrl);
        const title = encodeURIComponent(document.title || "Analyse Stratégique Google SGE par Salescraft");
        const text = encodeURIComponent("Découvrez cette analyse stratégique de Salescraft sur l'impact de Google SGE sur la visibilité en ligne pour les startups B2B SaaS ! #GoogleSGE #SEO #B2BSaaS #Salescraft");
        
        if(pageUrl === "VOTRE_URL_PUBLIQUE_QUAND_HEBERGE" && !window.location.href.startsWith('file:')) {
            showModal("Pour que le lien de partage LinkedIn fonctionne, veuillez remplacer 'VOTRE_URL_PUBLIQUE_QUAND_HEBERGE' dans le code ou héberger cette page en ligne.");
        }
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}&source=${url}`, '_blank', 'noopener,noreferrer');
    }, [showModal]); // Dependency for useCallback

    const toggleTheme = React.useCallback(() => setTheme(prev => (prev === 'light' ? 'dark' : 'light')), []); // Prefixed with React.

    const appGlobalStyles = React.useMemo(() => ` // Prefixed with React.
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap');

        .main-content-container { font-family: 'DM Sans', sans-serif; font-size: 1rem; }
        
        h1 { 
            font-family: 'Montserrat', sans-serif; 
            font-weight: 700; 
            font-size: 2.5rem; 
            line-height: 1.2;  
        }
        @media (min-width: 640px) { 
            h1 { 
                font-size: 3rem; 
                line-height: 1.15; 
            } 
        }
        
        h2.section-title { 
            font-family: 'Inter', sans-serif; 
            font-weight: 900; 
            letter-spacing: -0.01em; 
            font-size: 1.4rem; 
        }
        h3 { font-family: 'Inter', sans-serif; font-weight: 700; }
        .section-content p, .section-content li, .section-content div { color: ${currentThemeStyles.dataVizText}; }
        .button-solid { padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600; transition: all 0.3s ease-in-out; border: 2px solid ${COLORS.darkText}; box-shadow: 4px 4px 0px ${COLORS.darkText}; cursor: pointer; background-color: var(--button-bg-color); color: ${COLORS.darkText}; display: inline-flex; align-items: center; justify-content: center; text-align: center; }
        .button-solid:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px ${COLORS.darkText}; }
        .button-solid:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: 4px 4px 0px ${COLORS.darkText}; }
        
        .section-strategies-list-item > div > strong { display: block; margin-bottom: 0.25rem; } 
        .section-strategies-list-item .list-inside li { display: flex; align-items: flex-start; }
        .section-strategies-list-item .list-inside li .mr-2 { flex-shrink: 0; }

        .swot-card ul li { display: flex; align-items: flex-start; }
        .swot-card ul li .mr-2 { flex-shrink: 0; margin-top: 0.125em; }
        .swot-card ul li strong { margin-right: 0.25rem; }

    `, [currentThemeStyles.dataVizText]);
    
    const tocItems = React.useMemo(() => [ // Prefixed with React.
        { id: 'section-intro', title: 'Introduction', icon: <IconTocIntro /> },
        { id: 'section-shift', title: 'Le grand virage', icon: <IconTocShift /> },
        { id: 'section-challenges', title: 'Les défis majeurs', icon: <IconTocChallenges /> },
        { id: 'section-opportunities', title: 'Nouvelles voies', icon: <IconTocOpportunities /> },
        { id: 'section-strategies', title: 'Stratégies clés', icon: <IconTocStrategies /> },
        { id: 'section-solutions', title: 'Solutions', icon: <IconTocSolutions /> },
        { id: 'section-takeaways', title: 'Synthèse SWOT', icon: <IconTocTakeaways /> },
        { id: 'section-conclusion', title: 'Conclusion', icon: <IconTocConclusion /> },
    ], []);

    const handleTocClick = React.useCallback((e, itemId) => { // Prefixed with React.
        e.preventDefault();
        const targetElement = document.getElementById(itemId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveTocItem(itemId); 
    }, []);


    return (
        <React.Fragment>
            <style dangerouslySetInnerHTML={{ __html: appGlobalStyles }} />
            <Modal message={modalMessage} onClose={closeModal} visible={modalVisible} currentThemeStyles={currentThemeStyles} />
            
            <div className="p-4 sm:p-8 min-h-screen">
                <div
                    id="progressBar"
                    className="fixed top-0 left-0 h-2 z-50"
                    style={{ width: `${progressBarWidth}%`, backgroundColor: currentThemeStyles.progressBar, transition: 'width 0.2s ease-out' }}
                />
                <div
                    id="toc"
                    className={`fixed top-1/2 right-0 sm:right-2 transform -translate-y-1/2 rounded-l-2xl sm:rounded-2xl shadow-xl p-3 sm:p-4 z-40 hidden lg:flex flex-col gap-2 sm:gap-3 transition-all duration-400 ease-out ${showToc ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                    style={{ backgroundColor: currentThemeStyles.tocBg, border: `1px solid ${currentThemeStyles.border}` }}
                >
                    {tocItems.map(item => (
                        <a
                            key={item.id} href={`#${item.id}`}
                            className={`toc-item flex items-center p-2 rounded-lg font-medium text-sm transition-all duration-200 ${activeTocItem === item.id ? 'font-bold' : ''}`}
                            style={{
                                backgroundColor: activeTocItem === item.id ? currentThemeStyles.tocActiveBg : 'transparent',
                                color: activeTocItem === item.id ? currentThemeStyles.tocActiveText : currentThemeStyles.tocText,
                            }}
                            onMouseEnter={(e) => { if (activeTocItem !== item.id) e.currentTarget.style.backgroundColor = currentThemeStyles.tocHoverBg; }}
                            onMouseLeave={(e) => { if (activeTocItem !== item.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            onClick={(e) => handleTocClick(e, item.id)}
                            aria-current={activeTocItem === item.id ? "page" : undefined}
                        >
                            {item.icon}
                            <span className="truncate" title={item.title}>{item.title}</span>
                        </a>
                    ))}
                </div>
                <div
                    className="max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl main-content-container transition-colors duration-500"
                    style={{
                        backgroundColor: currentThemeStyles.mainContainerBg, color: currentThemeStyles.mainContainerText,
                        border: `2px solid ${currentThemeStyles.border}`, boxShadow: currentThemeStyles.shadow,
                    }}
                >
                    <div className="text-center mb-8 pt-4"> 
                        <svg className="h-12 sm:h-14 w-auto mx-auto mb-1" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"> 
                            <path d="M70 15 c3.33-6.67-5-13.33-11.67-10 c-5-6.67-16.67-6.67-20 0 c-6.67-3.33-15 3.33-11.67 10 c-6.67 1.67-6.67 11.67 0 13.33 c-3.33 6.67 5 13.33 11.67 10 c5 6.67 16.67 6.67 20 0 c6.67 3.33 15-3.33 11.67-10 c6.67-1.67 6.67-11.67 0-13.33 z" fill={currentThemeStyles.logoCloud} />
                            <polygon points="48.33,19.33 56.67,19.33 51.67,26 58.33,26 43.33,39.33 48.33,29.33 43.33,29.33" fill={currentThemeStyles.logoLightningText} /> 
                        </svg>
                        <p className="text-2xl sm:text-3xl font-bold tracking-wide" style={{ fontFamily: "'Anton', sans-serif", color: currentThemeStyles.logoLightningText }}>
                            SALESCRAFT
                        </p>
                    </div>

                    <p className="text-center text-base sm:text-lg font-semibold mb-2 uppercase tracking-wider" style={{ color: COLORS.blue }}>
                        L'ère post-SEO est là :
                    </p>
                    <h1 className="text-center mb-4" style={{ color: currentThemeStyles.mainContainerText }}>
                        Naviguer à l'ère de la recherche IA de Google en 2025 <br className="hidden md:block" />(et ne pas disparaître)
                    </h1>
                    <p className="text-center mb-10 text-sm sm:text-base font-medium" style={{ color: currentThemeStyles.mainContainerText }}>
                        Une analyse stratégique par <span className="font-bold" style={{ color: currentThemeStyles.logoLightningText }}>Salescraft</span>.
                    </p>

                    <div
                        className="rounded-2xl p-6 sm:p-8 mb-10 relative overflow-hidden transition-colors duration-500"
                        style={{
                            backgroundColor: currentThemeStyles.introBoxBg, border: `2px solid ${currentThemeStyles.introBoxBorder}`,
                            boxShadow: currentThemeStyles.introBoxShadow, color: currentThemeStyles.introBoxText
                        }}
                    >
                        <p className="text-center text-base leading-relaxed relative z-10 mb-4">Les annonces de Google I/O ont secoué le monde du marketing digital. Avec l'accélération de la Search Generative Experience (SGE), le jeu de l'acquisition client pour les entreprises B2B SaaS est en train de changer radicalement.</p>
                        <p className="text-center text-base leading-relaxed relative z-10">Cette étude vous explique concrètement ce que SGE change pour votre visibilité en ligne. On va voir ensemble les gros défis, mais surtout, on va vous donner une feuille de route claire pour transformer ce bouleversement en une vraie opportunité. L'objectif ? Vous donner toutes les clés pour que vos stratégies marketing et ventes soient parfaitement adaptées à cette nouvelle ère de la recherche.</p>
                    </div>
                    <div className="mb-10 text-center relative">
                        <img
                            src={`https://placehold.co/1000x250/${COLORS.blue.substring(1)}/${theme === 'light' ? 'ffffff' : COLORS.mint.substring(1)}?text=Redéfinir+la+visibilité+B2B+SaaS+avec+l'IA`}
                            alt="Illustration conceptuelle de la redéfinition de la visibilité B2B SaaS avec l'IA."
                            className="w-full rounded-xl shadow-md object-cover h-40 sm:h-64"
                            onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/1000x250/cccccc/ffffff?text=Image+Indisponible`; }}
                        />
                        <p className="text-base mt-4 italic" style={{ color: currentThemeStyles.mainContainerText }}>Le paysage de la recherche évolue à grande vitesse : adaptez votre stratégie dès maintenant.</p>
                    </div>
                    <div className="flex flex-wrap justify-center mb-10 gap-4">
                        <button onClick={shareLinkedin} className="button-solid" style={{ '--button-bg-color': COLORS.coral }}>Partager sur LinkedIn</button>
                        <button onClick={expandAll} className="button-solid" style={{ '--button-bg-color': COLORS.yellow }}>Tout déplier</button>
                        <button onClick={collapseAll} className="button-solid" style={{ '--button-bg-color': COLORS.mint }}>Tout replier</button>
                        <button onClick={toggleTheme} className="button-solid" style={{ '--button-bg-color': theme === 'light' ? COLORS.darkText : COLORS.lightBg, color: theme === 'light' ? COLORS.mint : COLORS.darkText }}>{`Mode ${theme === 'light' ? 'Sombre' : 'Clair'}`}</button>
                    </div>
                    
                    <div ref={infographicContentRef} className="space-y-12">
                        <Section id="section-intro" title="Introduction : l'impératif stratégique de SGE" icon={<IconIntro />} bgColor={COLORS.blue} activeSections={activeSections} toggleSection={toggleSection} currentThemeStyles={currentThemeStyles}>
                            <img src={`https://placehold.co/800x300/${COLORS.blue.substring(1)}/${theme === 'light' ? 'ffffff' : COLORS.mint.substring(1)}?text=IA+au+Coeur+de+la+Recherche`} alt="Illustration d'une interface Google SGE" className="w-full rounded-xl shadow-md mb-4" onError={(e) => e.target.src=`https://placehold.co/800x300/cccccc/ffffff?text=Image+Indisponible`} />
                            <p className="leading-relaxed mb-6">Google SGE (Search Generative Experience) n'est pas une simple mise à jour, c'est un changement de paradigme qui redéfinit l'acquisition client pour les entreprises B2B SaaS. L'IA génère des réponses synthétiques directement sur la page de résultats, réduisant drastiquement les clics vers les sites externes. Ce phénomène de "zero-click search" signifie que vos prospects trouvent l'information sans jamais visiter votre domaine.</p>
                            <div className="data-visualization p-4 rounded-lg shadow-inner" style={{ backgroundColor: currentThemeStyles.mainContainerBg, border: `1px solid ${currentThemeStyles.border}` }}>
                                <p className="text-lg font-bold mb-4" style={{ color: currentThemeStyles.dataVizText }}>Impact quantifié sur le trafic organique (Source: Pilot Digital 2024) :</p>
                                <ChartBar label="Baisse générale" value="-18% à -64%" width={36} barColor={COLORS.coral} currentThemeStyles={currentThemeStyles}/>
                                <ChartBar label="Longue traîne" value="-50% à -90%" width={45} barColor={COLORS.yellow} currentThemeStyles={currentThemeStyles}/>
                                <p className="text-sm mt-4" style={{ color: currentThemeStyles.dataVizText }}>Ces chiffres soulignent l'urgence d'une réévaluation stratégique. Votre dépendance à un seul canal est un risque majeur.</p>
                            </div>
                            <div className="data-visualization p-4 rounded-lg shadow-inner mt-8" style={{ backgroundColor: currentThemeStyles.mainContainerBg, border: `1px solid ${currentThemeStyles.border}` }}>
                                <p className="text-lg font-bold mb-4" style={{ color: currentThemeStyles.dataVizText }}>La montée du "zero-click search" :</p>
                                <ChartBar label="Recherches sans clic (2022)" value="~50%" width={50} barColor={COLORS.blue} currentThemeStyles={currentThemeStyles}/>
                                <p className="text-sm mt-4" style={{ color: currentThemeStyles.dataVizText }}>En 2022, près de la moitié des recherches Google n'entraînaient déjà aucun clic sortant. SGE accélère ce phénomène, rendant l'information accessible sans visite de site.</p>
                            </div>
                        </Section>
                        
                        <Section id="section-shift" title="Le grand virage : du moteur de recherche au moteur de réponse" icon={<IconShift />} bgColor={COLORS.coral} activeSections={activeSections} toggleSection={toggleSection} currentThemeStyles={currentThemeStyles}>
                           <img src={`https://placehold.co/800x300/${COLORS.coral.substring(1)}/${theme === 'light' ? 'ffffff' : COLORS.mint.substring(1)}?text=Parcours+Client+B2B+Transformé`} alt="Diagramme comparant le parcours client B2B avant et après SGE" className="w-full rounded-xl shadow-md mb-4" onError={(e) => e.target.src=`https://placehold.co/800x300/cccccc/ffffff?text=Image+Indisponible`} />
                            <p className="leading-relaxed mb-6">Une transformation fondamentale de l'interaction utilisateur avec Google, impactant directement votre entonnoir de vente. Ce changement modifie la manière dont les prospects découvrent et interagissent avec votre entreprise.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 rounded-xl shadow-md border swot-card" style={{ backgroundColor: currentThemeStyles.mainContainerBg, borderColor: currentThemeStyles.border }}>
                                    <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: COLORS.blue }}><span className="text-3xl mr-3">&bull;</span> Modèle précédent (SEO classique)</h3>
                                    <ul className="list-none space-y-3 text-base">
                                        <li><span className="mr-2" style={{ color: COLORS.blue }}>&bull;</span><strong>Résultats :</strong> Liste de liens organiques/sponsorisés.</li>
                                        <li><span className="mr-2" style={{ color: COLORS.blue }}>&bull;</span><strong>Comportement :</strong> L'utilisateur parcourt, compare, clique.</li>
                                        <li><span className="mr-2" style={{ color: COLORS.blue }}>&bull;</span><strong>Visibilité :</strong> Dépend du classement (Top 3 crucial).</li>
                                        <li><span className="mr-2" style={{ color: COLORS.blue }}>&bull;</span><strong>Objectif :</strong> Attirer le trafic vers le site.</li>
                                        <li><span className="mr-2" style={{ color: COLORS.blue }}>&bull;</span><strong>KPIs :</strong> Clics, trafic, positionnement.</li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-xl shadow-md border swot-card" style={{ backgroundColor: currentThemeStyles.mainContainerBg, borderColor: currentThemeStyles.border }}>
                                    <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: COLORS.coral }}><span className="text-3xl mr-3">&#9733;</span> Nouveau modèle (SGE - IA générative)</h3>
                                    <ul className="list-none space-y-3 text-base">
                                        <li><span className="mr-2" style={{ color: COLORS.coral }}>&bull;</span><strong>Résultats :</strong> Réponse synthétique IA en haut de page.</li>
                                        <li><span className="mr-2" style={{ color: COLORS.coral }}>&bull;</span><strong>Comportement :</strong> Obtient la réponse directe, clique moins.</li>
                                        <li><span className="mr-2" style={{ color: COLORS.coral }}>&bull;</span><strong>Visibilité :</strong> Très réduite, l'IA est l'intermédiaire clé.</li>
                                        <li><span className="mr-2" style={{ color: COLORS.coral }}>&bull;</span><strong>Objectif :</strong> Alimenter les réponses de l'IA, être cité.</li>
                                        <li><span className="mr-2" style={{ color: COLORS.coral }}>&bull;</span><strong>KPIs :</strong> Impressions de marque (sans clic), baisse du trafic direct.</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>

                        <Section id="section-challenges" title="Les défis majeurs pour les startups B2B SaaS" icon={<IconChallenges />} bgColor={COLORS.yellow} activeSections={activeSections} toggleSection={toggleSection} currentThemeStyles={currentThemeStyles}>
                            <img src={`https://placehold.co/800x300/${COLORS.yellow.substring(1)}/${theme === 'light' ? COLORS.darkText.substring(1) : COLORS.mint.substring(1)}?text=Défis+Stratégiques+SaaS`} alt="Illustration des défis pour les startups B2B SaaS" className="w-full rounded-xl shadow-md mb-4" onError={(e) => e.target.src=`https://placehold.co/800x300/cccccc/ffffff?text=Image+Indisponible`} />
                            <p className="leading-relaxed mb-6">L'écosystème digital mute, exigeant une adaptation rapide et stratégique pour maintenir votre croissance.</p>
                            <ul className="list-none space-y-5">
                                <li className="flex items-start section-challenges-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span><div><strong>Moins de visibilité organique, moins de prospects directs :</strong> Attirer des leads devient plus complexe car les clics vers votre site diminuent. Votre contenu est peut-être lu par l'IA, mais sans que le prospect n'arrive directement sur votre plateforme pour s'engager.</div></li>
                                <li className="flex items-start section-challenges-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span><div><strong>Une concurrence féroce pour "l'attention de l'IA" :</strong> La "première page" de Google, c'est maintenant la réponse de l'IA. Être cité par cette IA devient crucial, et cela pourrait avantager les grandes entreprises déjà bien établies.</div></li>
                                <li className="flex items-start section-challenges-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span><div><strong>Le parcours client B2B change de visage :</strong> Vos acheteurs B2B vont obtenir des "shortlists" de solutions directement via l'IA. La phase où ils se renseignaient sur votre site se déplace. Il faut repenser comment les engager à ce nouveau point de contact.</div></li>
                                <li className="flex items-start section-challenges-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span><div><strong>Difficile de mesurer ce qui marche vraiment :</strong> Vos indicateurs habituels (trafic, pages vues) perdent de leur sens. Comment suivre ces "prospects fantômes" qui se sont informés via l'IA sans passer par votre site ? Il faut de nouveaux outils pour mesurer votre performance.</div></li>
                                <li className="flex items-start section-challenges-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span><div><strong>Le contenu "basique" perd de sa valeur :</strong> Si l'IA absorbe vos articles pédagogiques génériques sans générer de trafic qualifié, leur retour sur investissement diminue. La clé, c'est de produire du contenu ultra-spécifique et de très haute qualité.</div></li>
                            </ul>
                        </Section>

                        <Section id="section-opportunities" title="Nouvelles voies de croissance" icon={<IconOpportunities />} bgColor={COLORS.mint} activeSections={activeSections} toggleSection={toggleSection} currentThemeStyles={currentThemeStyles}>
                           <img src={`https://placehold.co/800x300/${COLORS.mint.substring(1)}/${theme === 'light' ? COLORS.darkText.substring(1) : COLORS.darkText.substring(1)}?text=Nouvelles+Voies+de+Croissance`} alt="Illustration des opportunités stratégiques" className="w-full rounded-xl shadow-md mb-4" onError={(e) => e.target.src=`https://placehold.co/800x300/cccccc/ffffff?text=Image+Indisponible`} />
                            <p className="leading-relaxed mb-6">Transformez les défis en leviers de croissance inédits pour votre startup.</p>
                            <ul className="list-none space-y-5">
                                <li className="flex items-start section-opportunities-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>✓</span><div><strong>Accès à des visiteurs ultra-qualifiés :</strong> Ceux qui cliquent malgré la réponse IA sont des prospects à très forte intention. Concentrez-vous sur la valeur ajoutée spécifique et la résolution de problèmes complexes.</div></li>
                                <li className="flex items-start section-opportunities-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>✓</span><div><strong>Visibilité "passive" et renforcement de marque :</strong> Votre marque peut être citée comme source fiable par l'IA, augmentant votre notoriété et crédibilité même sans clic direct.</div></li>
                                <li className="flex items-start section-opportunities-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>✓</span><div><strong>Affirmation de l'autorité et de l'expertise :</strong> L'IA privilégie les informations vérifiables et de haute qualité. Devenez la référence incontournable sur votre verticale métier.</div></li>
                                <li className="flex items-start section-opportunities-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>✓</span><div><strong>Innovation dans les formats d'engagement :</strong> Expérimentez de nouveaux formats interactifs (chatbots, recherche vocale, API directes) et des expériences "augmentées" sur votre site pour capter l'attention.</div></li>
                            </ul>
                        </Section>

                        <Section id="section-strategies" title="Stratégies clés pour une croissance résiliente" icon={<IconStrategies />} bgColor={COLORS.blue} activeSections={activeSections} toggleSection={toggleSection} currentThemeStyles={currentThemeStyles}>
                           <img src={`https://placehold.co/800x300/${COLORS.blue.substring(1)}/${theme === 'light' ? 'ffffff' : COLORS.mint.substring(1)}?text=Feuille+de+route+stratégique`} alt="Illustration d'une feuille de route stratégique" className="w-full rounded-xl shadow-md mb-4" onError={(e) => e.target.src=`https://placehold.co/800x300/cccccc/ffffff?text=Image+Indisponible`} />
                            <p className="leading-relaxed mb-6">Diversifier, capitaliser, optimiser et réadapter : les piliers de votre succès dans l'ère post-SEO.</p>
                            <ul className="list-none space-y-6">
                                <li className="flex items-start section-strategies-list-item">
                                    <span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span>
                                    <div>
                                        <strong>Diversifiez vos canaux d'acquisition et d'influence :</strong>
                                        <ul className="list-none list-inside text-base ml-0 sm:ml-4 mt-2 space-y-2"> 
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>LinkedIn et le personal branding :</strong> Vos dirigeants et experts sont vos meilleurs atouts ! Encouragez-les à partager leurs connaissances sur LinkedIn, à lancer des discussions et à interagir. L'idée, c'est d'attirer l'attention de vos futurs clients là où ils sont déjà, en quête d'informations professionnelles.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Communautés et bouche-à-oreille :</strong> Créez des espaces où vos utilisateurs et experts peuvent échanger. Forums, groupes Slack/Discord, événements exclusifs... Ces lieux sont des mines d'or pour générer des recommandations authentiques et du bouche-à-oreille qualifié.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Relations presse (RP) et influenceurs B2B :</strong> Ne sous-estimez pas le pouvoir d'une bonne mention ! Ciblez les médias spécialisés et les influenceurs reconnus dans votre secteur. Une visibilité dans une publication clé ou une recommandation d'un leader d'opinion peut valoir bien plus qu'un bon classement SEO.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>SEO sur plateformes alternatives :</strong> Google n'est plus le seul terrain de jeu. Pensez à YouTube pour des tutoriels vidéo, aux podcasts pour des interviews d'experts, à Quora ou Reddit pour répondre aux questions de votre cible, ou même aux marketplaces d'applications B2B. Ce sont de nouveaux leviers de visibilité à explorer !</div></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="flex items-start section-strategies-list-item">
                                    <span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span>
                                    <div>
                                        <strong>Capitalisez sur votre audience propre :</strong>
                                        <ul className="list-none list-inside text-base ml-0 sm:ml-4 mt-2 space-y-2">
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Listes d'e-mails et newsletters premium :</strong> Votre liste d'abonnés est votre trésor ! Offrez des contenus exclusifs (études de marché, analyses pointues, modèles gratuits) via des newsletters pour fidéliser votre audience et l'inciter à s'inscrire.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Contenu "désiré" et exclusif :</strong> Créez des ressources à forte valeur ajoutée qui donnent envie de s'abonner ou de s'inscrire : podcasts avec des invités de renom, webinars interactifs, livres blancs de recherche originaux, outils gratuits... Le but est de créer un rendez-vous.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Programmes de fidélisation et ambassadeurs :</strong> Transformez vos clients les plus satisfaits en véritables porte-parole. Mettez en place des programmes de parrainage, recueillez des témoignages vidéo percutants, et facilitez le partage de leurs succès avec votre solution.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>CRM et personnalisation :</strong> Utilisez votre CRM pour segmenter votre audience et adapter vos communications. Un contenu ultra-pertinent pour un groupe spécifique aura un impact bien plus fort qu'un message générique.</div></li>
                                        </ul>
                                        <p className="text-sm italic mt-3" style={{color: currentThemeStyles.dataVizText, opacity: 0.8}}>"Si vous construisez juste du trafic, vous êtes vulnérable; si vous construisez une audience, vous survivrez."</p>
                                    </div>
                                </li>
                                <li className="flex items-start section-strategies-list-item">
                                    <span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span>
                                    <div>
                                        <strong>Optimisez votre contenu pour l'ère de l'IA ("SGE optimization") :</strong>
                                        <ul className="list-none list-inside text-base ml-0 sm:ml-4 mt-2 space-y-2">
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Qualité et pertinence avant tout :</strong> L'IA est gourmande en informations factuelles, précises et fiables. Concentrez-vous sur des contenus qui répondent directement aux questions complexes de votre cible, avec des données vérifiables et des sources solides.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Structure pour la lisibilité machine :</strong> Facilitez la tâche de l'IA ! Utilisez des balises sémantiques (Schema.org), des listes à puces, des tableaux, des FAQ claires. Plus votre contenu est bien structuré, plus l'IA le comprendra et l'intégrera facilement dans ses réponses.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Expertise, expérience, autorité, confiance (E-E-A-T) :</strong> Montrez qui vous êtes ! Mettez en avant l'identité des auteurs, leurs qualifications, leurs expériences réelles. Google valorise de plus en plus les contenus créés par de véritables experts reconnus.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Optimisation pour les "featured snippets" et les réponses directes :</strong> Soyez concis et direct ! Formulez des réponses courtes et précises aux questions courantes de votre industrie. Cela augmente vos chances d'être sélectionné par l'IA pour ses réponses synthétiques.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Le référencement classique comme fondation :</strong> Le SEO traditionnel (mots-clés pertinents, maillage interne, vitesse de chargement) reste indispensable. L'IA s'appuie sur ces bases pour identifier les sources fiables. Un bon SEO est un prérequis pour une bonne "SGE optimization".</div></li>
                                        </ul>
                                        <p className="text-sm italic mt-3" style={{color: currentThemeStyles.dataVizText, opacity: 0.8}}>La qualité et l'expertise priment sur la quantité. Pensez E-E-A-T (expérience, expertise, autorité, confiance).</p>
                                    </div>
                                </li>
                                <li className="flex items-start section-strategies-list-item">
                                    <span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span>
                                    <div>
                                        <strong>Réadaptez votre entonnoir de conversion et le parcours client :</strong>
                                        <ul className="list-none list-inside text-base ml-0 sm:ml-4 mt-2 space-y-2">
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Votre site web : du trafic à la conversion profonde :</strong> Votre site ne sera plus le premier arrêt pour les informations basiques. Il doit devenir un véritable centre d'expertise, proposant des démos personnalisées, des essais gratuits, des consultations directes, et un contenu ultra-spécialisé qui justifie un clic.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Coordination marketing-ventes renforcée :</strong> Créez une "cellule de crise" SGE où marketing et ventes travaillent main dans la main. Le marketing doit partager les insights de l'IA avec les ventes, et les ventes doivent remonter les questions des clients pour affiner la stratégie de contenu.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Engagement direct via chatbots et messageries :</strong> Intégrez des chatbots intelligents sur votre site pour répondre aux questions post-SGE et qualifier les leads. Explorez les canaux de messagerie (WhatsApp Business, Slack) pour un dialogue plus direct et personnalisé.</div></li>
                                            <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span><div><strong>Nouveaux KPIs et expérimentation continue :</strong> Mesurez les "impressions de marque" (quand l'IA cite votre site), le trafic direct qualifié, le taux de conversion des visiteurs post-SGE, et l'engagement sur vos canaux propriétaires. Testez A/B de nouvelles pages de destination, de nouveaux appels à l'action, et de nouvelles approches de contenu.</div></li>
                                        </ul>
                                        <p className="text-sm italic mt-3" style={{color: currentThemeStyles.dataVizText, opacity: 0.8}}>L'expérience prospect doit être fluide et personnalisée, orchestrant un parcours hybride IA-humain.</p>
                                    </div>
                                </li>
                            </ul>
                        </Section>

                        <Section id="section-solutions" title="Nouveaux modèles et opportunités business" icon={<IconSolutions />} bgColor={COLORS.coral} activeSections={activeSections} toggleSection={toggleSection} currentThemeStyles={currentThemeStyles}>
                           <img src={`https://placehold.co/800x300/${COLORS.coral.substring(1)}/${theme === 'light' ? 'ffffff' : COLORS.mint.substring(1)}?text=Innovation+post-SGE`} alt="Illustration de l'innovation post-SGE" className="w-full rounded-xl shadow-md mb-4" onError={(e) => e.target.src=`https://placehold.co/800x300/cccccc/ffffff?text=Image+Indisponible`} />
                            <p className="leading-relaxed mb-6">De nouvelles pistes et opportunités émergent pour naviguer ce nouvel écosystème. Transformez les défis en avantages concurrentiels concrets pour votre entreprise !</p>
                            <ul className="list-none space-y-5">
                                <li className="flex items-start section-solutions-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>&bull;</span><div><strong>Des outils pour voir votre visibilité dans l'IA :</strong> Imaginez des tableaux de bord qui vous montrent exactement quand et comment Google SGE parle de vous. Salescraft est déjà en train de développer des solutions de pointe pour ça !</div></li>
                                <li className="flex items-start section-solutions-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>&bull;</span><div><strong>Des experts pour vous guider :</strong> De nouvelles agences et consultants spécialisés en "Optimisation pour la Recherche Générative" (GSO) ou "Optimisation pour les Moteurs de Réponse" (AEO) apparaissent. Ils sont là pour vous aider à adapter votre contenu et votre stratégie.</div></li>
                                <li className="flex items-start section-solutions-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>&bull;</span><div><strong>Rendre vos données "parlantes" pour l'IA :</strong> Des services qui vous permettent de structurer vos informations pour que les intelligences artificielles puissent les comprendre et les utiliser facilement. C'est comme donner la clé de votre savoir à l'IA.</div></li>
                                <li className="flex items-start section-solutions-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>&bull;</span><div><strong>Des "badges de confiance" numériques :</strong> Des certifications pour prouver que vos informations sont fiables. C'est un moyen de rassurer l'IA (et les utilisateurs) sur la qualité de vos sources.</div></li>
                                <li className="flex items-start section-solutions-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>&bull;</span><div><strong>De nouvelles façons de faire de la pub :</strong> Imaginez pouvoir "sponsoriser" une réponse IA ou trouver de nouvelles sources de revenus pour votre contenu. Le paysage publicitaire évolue aussi !</div></li>
                                <li className="flex items-start section-solutions-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>&bull;</span><div><strong>Le retour en force des plateformes d'avis et des communautés :</strong> Les sites comme G2 ou Capterra, et les groupes d'experts, deviennent encore plus importants. Les avis humains et les discussions authentiques reprennent le dessus.</div></li>
                                <li className="flex items-start section-solutions-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.blue }}>&bull;</span><div><strong>Des "plugins" pour discuter avec l'IA :</strong> Développez des extensions pour ChatGPT ou d'autres IA pour que les utilisateurs puissent interroger directement votre outil ou votre base de connaissances. C'est un accès direct à votre expertise !</div></li>
                            </ul>
                        </Section>

                        <Section id="section-takeaways" title="Synthèse SWOT : votre positionnement stratégique" icon={<IconTakeaways />} bgColor={COLORS.yellow} activeSections={activeSections} toggleSection={toggleSection} currentThemeStyles={currentThemeStyles}>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 rounded-xl shadow-md border swot-card" style={{ backgroundColor: currentThemeStyles.mainContainerBg, borderColor: currentThemeStyles.border }}>
                                    <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: COLORS.blue }}><span className="text-3xl mr-3">✓</span><strong>Forces (internes)</strong></h3>
                                    <ul className="list-none space-y-3 text-base">
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Contenus de niche de haute qualité (expertise pointue).</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Communauté existante de clients satisfaits.</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Agilité de la startup pour pivoter rapidement.</li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-xl shadow-md border swot-card" style={{ backgroundColor: currentThemeStyles.mainContainerBg, borderColor: currentThemeStyles.border }}>
                                    <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: COLORS.coral }}><span className="text-3xl mr-3">❌</span><strong>Faiblesses (internes)</strong></h3>
                                    <ul className="list-none space-y-3 text-base">
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Dépendance élevée à l'organique Google.</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Notoriété de marque encore faible.</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Ressources marketing limitées.</li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-xl shadow-md border swot-card" style={{ backgroundColor: currentThemeStyles.mainContainerBg, borderColor: currentThemeStyles.border }}>
                                    <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: COLORS.blue }}><span className="text-3xl mr-3">💡</span><strong>Opportunités (externes)</strong></h3>
                                    <ul className="list-none space-y-3 text-base">
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Se positionner en leader sur les contenus de fond.</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Nouveaux formats publicitaires SGE.</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Désaffection pour Google (plus d'avis humains).</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Audience internationale via l'IA.</li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-xl shadow-md border swot-card" style={{ backgroundColor: currentThemeStyles.mainContainerBg, borderColor: currentThemeStyles.border }}>
                                    <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: COLORS.coral }}><span className="text-3xl mr-3">⚠️</span><strong>Menaces (externes)</strong></h3>
                                    <ul className="list-none space-y-3 text-base">
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Chute drastique de trafic organique.</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Inflation des coûts d'acquisition payants.</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Difficulté à construire la confiance à distance.</li>
                                        <li className="flex items-start"><span className="mr-2 mt-1 flex-shrink-0" style={{ color: currentThemeStyles.dataVizText }}>&bull;</span> Nouveaux concurrents maîtrisant l'écosystème IA.</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>

                        <Section id="section-conclusion" title="Conclusion : votre feuille de route pour le succès" icon={<IconConclusion />} bgColor={COLORS.blue} activeSections={activeSections} toggleSection={toggleSection} currentThemeStyles={currentThemeStyles}>
                           <img src={`https://placehold.co/800x300/${COLORS.blue.substring(1)}/${theme === 'light' ? 'ffffff' : COLORS.mint.substring(1)}?text=Avenir+marketing+digital+B2B`} alt="Illustration de l'avenir du marketing digital B2B" className="w-full rounded-xl shadow-md mb-4" onError={(e) => e.target.src=`https://placehold.co/800x300/cccccc/ffffff?text=Image+Indisponible`} />
                            <p className="leading-relaxed mb-6">La Search Generative Experience n'est pas une fin, mais un nouveau départ pour les leaders de demain.</p>
                            <ul className="list-none space-y-4">
                                <li className="flex items-start section-conclusion-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span><div><strong>Mettez l'humain et la valeur au cœur de tout :</strong> Votre contenu doit vraiment aider vos clients. Créez des ressources qui répondent à leurs vrais problèmes, et construisez une relation de confiance solide. Soyez la référence incontournable, celle vers qui on se tourne naturellement.</div></li>
                                <li className="flex items-start section-conclusion-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span><div><strong>Ne mettez pas tous vos œufs dans le même panier digital :</strong> Ne comptez plus uniquement sur un seul canal pour trouver vos clients. Développez votre propre communauté, explorez de nouvelles plateformes et soyez là où vos prospects se trouvent, même en dehors de Google.</div></li>
                                <li className="flex items-start section-conclusion-list-item"><span className="mt-1 mr-3 text-2xl flex-shrink-0" style={{ color: COLORS.coral }}>&bull;</span><div><strong>Soyez curieux et n'ayez pas peur d'innover :</strong> Le monde digital bouge vite, très vite ! Restez ouvert aux nouvelles idées, testez régulièrement de nouvelles approches, et adaptez-vous sans cesse. Votre agilité sera votre meilleure alliée.</div></li>
                            </ul>
                            <p className="leading-relaxed mt-6">C'est la fin de l'acquisition facile par le SEO, et le début d'un marketing plus holistique, centré sur l'humain, l'expertise et la capacité à dialoguer directement avec vos prospects. L'IA absorbe le factuel ; votre différenciation viendra de l'authenticité, de l'expertise vécue et de la créativité.</p>
                            <p className="text-lg font-semibold text-center mt-8" style={{ color: COLORS.coral }}>Google SGE redistribue les cartes ; à vous de jouer la prochaine main avec stratégie et détermination. <span className="font-bold">Salescraft est votre partenaire pour cette transformation.</span></p>
                            <div className="flex justify-center mt-8">
                                <svg className="h-10 w-auto" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M420 120 c20-40-30-80-70-60 c-30-40-100-40-120 0 c-40-20-90 20-70 60 c-40 10-40 70 0 80 c-20 40 30 80 70 60 c30 40 100 40 120 0 c40 20 90-20 70-60 c40-10 40-70 0-80 z" fill={currentThemeStyles.logoCloud} />
                                    <polygon points="290,140 340,140 310,180 350,180 260,260 290,200 260,200" fill={currentThemeStyles.logoLightningText} />
                                    <text x="60" y="350" fontFamily="Inter, sans-serif" fontSize="90" fontWeight="bold" fill={currentThemeStyles.logoLightningText}>Salescraft</text>
                                </svg>
                            </div>
                        </Section>
                        
                        <div
                            className="rounded-2xl p-6 mt-12 transition-colors duration-500"
                            style={{
                                backgroundColor: currentThemeStyles.sourcesBg, border: `2px solid ${COLORS.darkText}`,
                                boxShadow: `8px 8px 0px ${COLORS.darkText}`, color: currentThemeStyles.sourcesText,
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-4" style={{ color: currentThemeStyles.sourcesText }}>Sources et références clés</h2>
                            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base" style={{ color: currentThemeStyles.sourcesText }}>
                                <li>Pilot Digital – Google Generative Search (SGE) and its effect on organic traffic (2024)</li>
                                <li>Digilityx – Google SGE : définition et impact sur le SEO</li>
                                <li>Pilot Digital – Optimizing for AI agents: preparing for the post-human internet (2025)</li>
                                <li>SingleGrain – What is Google’s SGE and how does it affect SEO? (2024)</li>
                                <li>Inceptly – Google testing new SGE ad format: “You may also like” carousel (2023)</li>
                                <li>Insight Partners – Generative AI, SEO, and what leaders should know (2023)</li>
                                <li>Delante – How to adapt SEO strategies to better appear in Google SGE (2023)</li>
                                <li>How to adapt SEO strategies to better appear in Google SGE? | SEO / SEM Agency: Delante</li>
                                <li>Optimizing for AI agents: preparing for the post-human internet – Pilot Digital</li>
                                <li>Generative AI, SEO, and what leaders should know: Google search in the future | Insight Partners</li>
                            </ul>
                            <div className="flex justify-center mt-6">
                                <a
                                    href="VOTRE_LIEN_VERS_LE_PDF_COMPLET_ICI" 
                                    download="Impact-de-Google-SGE-sur-la-visibilite-en-ligne-strategies-et-opportunites-pour-les-startups-B2B-Saa.pdf"
                                    className="button-solid" style={{ '--button-bg-color': COLORS.blue, color: COLORS.darkText }}
                                    target="_blank" rel="noopener noreferrer"
                                >Télécharger l'étude complète (PDF exemple)</a>
                            </div>
                        </div>
                    </div> 
                    <Footer currentThemeStyles={currentThemeStyles} />
                </div>
            </div>
        </React.Fragment>
    );
};

// The following part is for environments where React and ReactDOM are loaded via CDN
// and this script is directly included in an HTML file.
// If using a build system like Vite or Create React App, this part is typically handled by index.js or main.jsx.

if (typeof ReactDOM !== 'undefined' && typeof React !== 'undefined') {
    let rootElement = document.getElementById('root');
    if (!rootElement) {
        // If 'root' doesn't exist, create it (though index.html should provide it)
        console.warn("L'élément racine 'root' n'a pas été trouvé. Création de l'élément.");
        rootElement = document.createElement('div');
        rootElement.id = 'root';
        document.body.appendChild(rootElement);
    }
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("React ou ReactDOM ne sont pas chargés. Vérifiez les scripts CDN dans votre index.html.");
}
