import { Link } from 'react-router-dom'
import './LandingPage.css'

export function LandingPage() {
    return (
        <div className="landing-page">

            {/* NAVIGATION */}
            <nav className="landing-nav">
                <Link to="/" className="landing-logo">
                    FormLab
                </Link>

                <div className="landing-nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>
                </div>

                <div className="landing-nav-actions">
                    <Link to="/login" className="landing-nav-login">
                        Log in
                    </Link>

                    <Link
                        to="/register"
                        className="landing-nav-button"
                    >
                        Get started
                    </Link>
                </div>
            </nav>

            <main>

                {/* HERO */}
                <section className="landing-hero">
                    <div className="landing-hero-content">

                        <div className="landing-hero-eyebrow">
                            <span className="landing-hero-eyebrow-dot" />
                            PRECISION TRAINING SYSTEM
                        </div>

                        <h1>
                            Build your workouts.
                            <br />
                            Track every set.
                            <br />
                            <span>Get stronger.</span>
                        </h1>

                        <p className="landing-hero-description">
                            Train with precision. Learn correct exercise
                            technique through interactive 3D guidance and
                            track every set, rep, and load in one place.
                        </p>

                        <div className="landing-hero-actions">
                            <Link
                                to="/register"
                                className="landing-button landing-button-primary"
                            >
                                Start training
                            </Link>

                            <a
                                href="#features"
                                className="landing-button landing-button-secondary"
                            >
                                Explore FormLab
                            </a>
                        </div>
                    </div>

                    {/* HERO PRODUCT MOCKUP */}
                    <div className="landing-hero-visual">
                        <div className="landing-product-frame">

                            <div className="landing-product-topbar">
                                <div className="landing-product-dots">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <span className="landing-product-url">
                                    formlab.app / exercise-guide
                                </span>

                                <span className="landing-product-status">
                                    ● LIVE
                                </span>
                            </div>

                            <div className="landing-exercise-view">

                                <div className="landing-hero-exercise-grid" />

                                <div className="landing-exercise-title">
                                    <span>EXERCISE GUIDE</span>
                                    <strong>Barbell Back Squat</strong>
                                </div>

                                <div className="landing-form-cues">
                                    <span>✓ Keep chest up</span>
                                    <span>✓ Knees track over toes</span>
                                    <span>✓ Controlled descent</span>
                                </div>

                                <div className="landing-squat-model">
                                    <div className="landing-model-head" />
                                    <div className="landing-model-torso" />

                                    <div className="landing-model-arm landing-model-arm-left" />
                                    <div className="landing-model-arm landing-model-arm-right" />

                                    <div className="landing-barbell">
                                        <span />
                                        <div />
                                        <span />
                                    </div>

                                    <div className="landing-model-leg landing-model-leg-left" />
                                    <div className="landing-model-leg landing-model-leg-right" />

                                    <div className="landing-model-foot landing-model-foot-left" />
                                    <div className="landing-model-foot landing-model-foot-right" />
                                </div>

                                <div className="landing-movement-arrow landing-arrow-left">
                                    ↓
                                </div>

                                <div className="landing-movement-arrow landing-arrow-right">
                                    ↓
                                </div>

                                <div className="landing-joint landing-joint-shoulder-left" />
                                <div className="landing-joint landing-joint-shoulder-right" />
                                <div className="landing-joint landing-joint-knee-left" />
                                <div className="landing-joint landing-joint-knee-right" />

                                <div className="landing-set-panel">
                                    <div className="landing-set-panel-heading">
                                        <span>SESSION</span>
                                        <span>SETS</span>
                                    </div>

                                    <div className="landing-set-row">
                                        <span>Set 1</span>
                                        <strong>140 kg × 8</strong>
                                        <b>✓</b>
                                    </div>

                                    <div className="landing-set-row">
                                        <span>Set 2</span>
                                        <strong>140 kg × 8</strong>
                                        <b>✓</b>
                                    </div>

                                    <div className="landing-set-row landing-set-row-active">
                                        <span>Set 3</span>
                                        <strong>145 kg × 6</strong>
                                        <b>✓</b>
                                    </div>
                                </div>

                                <div className="landing-viewer-label">
                                    3D EXERCISE GUIDE
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section
                    id="features"
                    className="landing-features"
                >
                    <div className="landing-section-heading">
                        <span className="landing-section-label">
                            THE SYSTEM
                        </span>

                        <h2>
                            Everything you need to
                            <br />
                            structure your training.
                        </h2>

                        <p>
                            A precise training environment built to help you
                            understand movement, organize workouts, and track
                            measurable progress.
                        </p>
                    </div>

                    <div className="landing-feature-grid">

                        <article className="landing-feature-card">
                            <span className="landing-feature-number">01</span>

                            <div className="landing-feature-icon">↗</div>

                            <h3>Build workouts</h3>

                            <p>
                                Create structured workouts and organize
                                exercises around your training goals.
                            </p>
                        </article>

                        <article className="landing-feature-card">
                            <span className="landing-feature-number">02</span>

                            <div className="landing-feature-icon">◉</div>

                            <h3>3D exercise guidance</h3>

                            <p>
                                Learn correct movement through interactive
                                3D demonstrations and precise form cues.
                            </p>
                        </article>

                        <article className="landing-feature-card">
                            <span className="landing-feature-number">03</span>

                            <div className="landing-feature-icon">⌁</div>

                            <h3>Track your sets</h3>

                            <p>
                                Record weight, reps, and performance while
                                keeping every training session organized.
                            </p>
                        </article>

                        <article className="landing-feature-card">
                            <span className="landing-feature-number">04</span>

                            <div className="landing-feature-icon">□</div>

                            <h3>Stay organized</h3>

                            <p>
                                Keep your training history structured and
                                build a clear picture of your progress.
                            </p>
                        </article>

                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section
                    id="how-it-works"
                    className="landing-workflow"
                >
                    <div className="landing-section-heading landing-section-heading-centered">
                        <span className="landing-section-label">
                            STANDARD OPERATING PROCEDURE
                        </span>

                        <h2>
                            Train with precision.
                        </h2>
                    </div>

                    <div className="landing-workflow-grid">

                        <article className="landing-workflow-card">
                            <span>01</span>

                            <h3>Create your account</h3>

                            <p>
                                Set up your profile and establish your
                                training environment.
                            </p>
                        </article>

                        <article className="landing-workflow-card">
                            <span>02</span>

                            <h3>Build your workout</h3>

                            <p>
                                Create structured workouts and choose the
                                exercises you want to perform.
                            </p>
                        </article>

                        <article className="landing-workflow-card">
                            <span>03</span>

                            <h3>Train with precision</h3>

                            <p>
                                Follow 3D exercise demonstrations, execute
                                proper form, and record your sets.
                            </p>
                        </article>

                    </div>

                    {/* DASHBOARD PREVIEW */}
                    <div className="landing-dashboard-preview">

                        <div className="landing-dashboard-browser-bar">
                            <div className="landing-browser-dots">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="landing-browser-address">
                                formlab.app / dashboard
                            </div>
                        </div>

                        <div className="landing-dashboard-body">

                            <aside className="landing-dashboard-sidebar">
                                <strong>FormLab</strong>

                                <span className="landing-dashboard-active">
                                    ▣ Dashboard
                                </span>

                                <span>⌁ Workouts</span>
                                <span>⌁ Analytics</span>
                            </aside>

                            <div className="landing-dashboard-main">

                                <div className="landing-dashboard-header">
                                    <div>
                                        <small>CURRENT PROGRAM</small>
                                        <h3>
                                            Hypertrophy Block A — Week 3
                                        </h3>
                                    </div>

                                    <span className="landing-dashboard-time">
                                        45:12
                                    </span>
                                </div>

                                <div className="landing-dashboard-content">

                                    <div className="landing-volume-chart">
                                        <span>Volume Trend (kg)</span>

                                        <div className="landing-bars">
                                            <i />
                                            <i />
                                            <i />
                                            <i />
                                            <i className="landing-bars-current" />
                                        </div>
                                    </div>

                                    <div className="landing-progress-panel">
                                        <span>IN PROGRESS</span>

                                        <strong>Barbell Back Squat</strong>

                                        <div>
                                            Set 1
                                            <b>140kg × 8 ✓</b>
                                        </div>

                                        <div>
                                            Set 2
                                            <b>140kg × 8 ✓</b>
                                        </div>

                                        <div className="landing-progress-current-set">
                                            Set 3
                                            <b>145kg × 6 ✓</b>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="landing-final-cta">
                    <span className="landing-section-label">
                        START TRAINING
                    </span>

                    <h2>
                        Ready to take control
                        <br />
                        of your training?
                    </h2>

                    <p>
                        Build structured workouts, train with better
                        technique, and track your progress with FormLab.
                    </p>

                    <div className="landing-hero-actions">
                        <Link
                            to="/register"
                            className="landing-button landing-button-primary"
                        >
                            Get started
                        </Link>

                        <Link
                            to="/login"
                            className="landing-button landing-button-secondary"
                        >
                            Log in
                        </Link>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="landing-footer">

                <div className="landing-footer-brand">
                    <strong>FormLab</strong>

                    <p>
                        Precision software for athletes and coaches
                        who rely on structured programming and
                        biomechanical analysis.
                    </p>
                </div>

                <div className="landing-footer-column">
                    <strong>PRODUCT</strong>
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>
                </div>

                <div className="landing-footer-column">
                    <strong>ACCOUNT</strong>
                    <Link to="/login">Log in</Link>
                    <Link to="/register">Get started</Link>
                </div>

                <div className="landing-footer-bottom">
                    <span>
                        © 2026 FormLab Systems. All rights reserved.
                    </span>

                    <span>
                        PRECISION / PERFORMANCE / PROGRESS
                    </span>
                </div>

            </footer>
        </div>
    )
}