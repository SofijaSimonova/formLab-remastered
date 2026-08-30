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
                    <Link to="/login" className="nav-login">
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
                <section className="hero">
                    <div className="hero-content">

                        <div className="hero-eyebrow">
                            <span className="hero-eyebrow-dot" />
                            PRECISION TRAINING SYSTEM
                        </div>

                        <h1>
                            Build your workouts.
                            <br />
                            Track every set.
                            <br />
                            <span>Get stronger.</span>
                        </h1>

                        <p className="hero-description">
                            Train with precision. Learn correct exercise
                            technique through interactive 3D guidance and
                            track every set, rep, and load in one place.
                        </p>

                        <div className="hero-actions">
                            <Link
                                to="/register"
                                className="button button-primary"
                            >
                                Start training
                            </Link>

                            <a
                                href="#features"
                                className="button button-secondary"
                            >
                                Explore FormLab
                            </a>
                        </div>
                    </div>

                    {/* HERO PRODUCT MOCKUP */}
                    <div className="hero-visual">
                        <div className="product-frame">

                            <div className="product-topbar">
                                <div className="product-dots">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <span className="product-url">
                                    formlab.app / exercise-guide
                                </span>

                                <span className="product-status">
                                    ● LIVE
                                </span>
                            </div>

                            <div className="exercise-view">

                                <div className="hero-exercise-grid" />

                                <div className="exercise-title">
                                    <span>EXERCISE GUIDE</span>
                                    <strong>Barbell Back Squat</strong>
                                </div>

                                <div className="form-cues">
                                    <span>✓ Keep chest up</span>
                                    <span>✓ Knees track over toes</span>
                                    <span>✓ Controlled descent</span>
                                </div>

                                {/* CSS 3D mannequin */}
                                <div className="squat-model">
                                    <div className="model-head" />
                                    <div className="model-torso" />

                                    <div className="model-arm model-arm-left" />
                                    <div className="model-arm model-arm-right" />

                                    <div className="barbell">
                                        <span />
                                        <div />
                                        <span />
                                    </div>

                                    <div className="model-leg model-leg-left" />
                                    <div className="model-leg model-leg-right" />

                                    <div className="model-foot model-foot-left" />
                                    <div className="model-foot model-foot-right" />
                                </div>

                                <div className="movement-arrow arrow-left">
                                    ↓
                                </div>

                                <div className="movement-arrow arrow-right">
                                    ↓
                                </div>

                                <div className="joint joint-shoulder-left" />
                                <div className="joint joint-shoulder-right" />
                                <div className="joint joint-knee-left" />
                                <div className="joint joint-knee-right" />

                                <div className="set-panel">
                                    <div className="set-panel-heading">
                                        <span>SESSION</span>
                                        <span>SETS</span>
                                    </div>

                                    <div className="set-row">
                                        <span>Set 1</span>
                                        <strong>140 kg × 8</strong>
                                        <b>✓</b>
                                    </div>

                                    <div className="set-row">
                                        <span>Set 2</span>
                                        <strong>140 kg × 8</strong>
                                        <b>✓</b>
                                    </div>

                                    <div className="set-row active">
                                        <span>Set 3</span>
                                        <strong>145 kg × 6</strong>
                                        <b>✓</b>
                                    </div>
                                </div>

                                <div className="viewer-label">
                                    3D EXERCISE GUIDE
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section
                    id="features"
                    className="features"
                >
                    <div className="section-heading">
                        <span className="section-label">
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

                    <div className="feature-grid">

                        <article className="feature-card">
                            <span className="feature-number">01</span>

                            <div className="feature-icon">↗</div>

                            <h3>Build workouts</h3>

                            <p>
                                Create structured workouts and organize
                                exercises around your training goals.
                            </p>
                        </article>

                        <article className="feature-card">
                            <span className="feature-number">02</span>

                            <div className="feature-icon">◉</div>

                            <h3>3D exercise guidance</h3>

                            <p>
                                Learn correct movement through interactive
                                3D demonstrations and precise form cues.
                            </p>
                        </article>

                        <article className="feature-card">
                            <span className="feature-number">03</span>

                            <div className="feature-icon">⌁</div>

                            <h3>Track your sets</h3>

                            <p>
                                Record weight, reps, and performance while
                                keeping every training session organized.
                            </p>
                        </article>

                        <article className="feature-card">
                            <span className="feature-number">04</span>

                            <div className="feature-icon">□</div>

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
                    className="workflow"
                >
                    <div className="section-heading centered">
                        <span className="section-label">
                            STANDARD OPERATING PROCEDURE
                        </span>

                        <h2>
                            Train with precision.
                        </h2>
                    </div>

                    <div className="workflow-grid">

                        <article className="workflow-card">
                            <span>01</span>

                            <h3>Create your account</h3>

                            <p>
                                Set up your profile and establish your
                                training environment.
                            </p>
                        </article>

                        <article className="workflow-card">
                            <span>02</span>

                            <h3>Build your workout</h3>

                            <p>
                                Create structured workouts and choose the
                                exercises you want to perform.
                            </p>
                        </article>

                        <article className="workflow-card">
                            <span>03</span>

                            <h3>Train with precision</h3>

                            <p>
                                Follow 3D exercise demonstrations, execute
                                proper form, and record your sets.
                            </p>
                        </article>

                    </div>

                    {/* DASHBOARD PREVIEW */}
                    <div className="dashboard-preview">

                        <div className="dashboard-browser-bar">
                            <div className="browser-dots">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="browser-address">
                                formlab.app / dashboard
                            </div>
                        </div>

                        <div className="dashboard-body">

                            <aside className="dashboard-sidebar">
                                <strong>FormLab</strong>

                                <span className="dashboard-active">
                                    ▣ Dashboard
                                </span>

                                <span>⌁ Workouts</span>
                                <span>⌁ Analytics</span>
                            </aside>

                            <div className="dashboard-main">

                                <div className="dashboard-header">
                                    <div>
                                        <small>CURRENT PROGRAM</small>
                                        <h3>
                                            Hypertrophy Block A — Week 3
                                        </h3>
                                    </div>

                                    <span className="dashboard-time">
                                        45:12
                                    </span>
                                </div>

                                <div className="dashboard-content">

                                    <div className="volume-chart">
                                        <span>Volume Trend (kg)</span>

                                        <div className="bars">
                                            <i />
                                            <i />
                                            <i />
                                            <i />
                                            <i className="current" />
                                        </div>
                                    </div>

                                    <div className="progress-panel">
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

                                        <div className="current-set">
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
                <section className="final-cta">
                    <span className="section-label">
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

                    <div className="hero-actions">
                        <Link
                            to="/register"
                            className="button button-primary"
                        >
                            Get started
                        </Link>

                        <Link
                            to="/login"
                            className="button button-secondary"
                        >
                            Log in
                        </Link>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="landing-footer">

                <div className="footer-brand">
                    <strong>FormLab</strong>

                    <p>
                        Precision software for athletes and coaches
                        who rely on structured programming and
                        biomechanical analysis.
                    </p>
                </div>

                <div className="footer-column">
                    <strong>PRODUCT</strong>
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>
                </div>

                <div className="footer-column">
                    <strong>ACCOUNT</strong>
                    <Link to="/login">Log in</Link>
                    <Link to="/register">Get started</Link>
                </div>

                <div className="footer-bottom">
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