
import React from 'react';
import Layout from '@/components/Layout';
import PredictionForm from '@/components/PredictionForm';
import PredictionHistory from '@/components/PredictionHistory';
import VerificationPanel from '@/components/VerificationPanel';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto pt-24 px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-slide-down">
            <div className="inline-block mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Blockchain + AI Technology
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
              AI-Generated Crypto Predictions 
              <span className="text-primary"> On-Chain</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Transparent, verifiable, and tamper-proof cryptocurrency price forecasts powered by artificial intelligence and secured by blockchain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a href="#request" className="px-8 py-3 bg-primary text-white rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors">
                Get a Prediction
              </a>
              <Link to="/nft-predictions" className="px-8 py-3 bg-secondary text-foreground/80 rounded-xl font-medium hover:bg-secondary/70 transition-colors">
                NFT Predictions
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">AI-Powered Forecasting</h3>
              <p className="text-foreground/70">
                Advanced machine learning models analyze market data to generate accurate price predictions for various cryptocurrencies.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">On-Chain Transparency</h3>
              <p className="text-foreground/70">
                All predictions are permanently recorded on the blockchain, creating an immutable and transparent history anyone can verify.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Tamper-Proof Verification</h3>
              <p className="text-foreground/70">
                Cryptographic verification ensures the integrity of predictions, preventing manipulation and maintaining trust in the system.
              </p>
            </div>
          </div>
        </section>
        
        {/* Request Prediction */}
        <section id="request" className="py-16">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
              Get Started
            </span>
            <h2 className="text-3xl font-medium">Request a New Prediction</h2>
            <p className="text-foreground/70 mt-2 max-w-2xl mx-auto">
              Select a cryptocurrency and timeframe to get an AI-generated price prediction that will be recorded on the blockchain.
            </p>
          </div>
          
          <PredictionForm />
        </section>
        
        {/* Prediction History */}
        <section id="predictions" className="py-16">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
              Track Record
            </span>
            <h2 className="text-3xl font-medium">Historical Predictions</h2>
            <p className="text-foreground/70 mt-2 max-w-2xl mx-auto">
              Browse through past predictions to evaluate performance and track accuracy over time.
            </p>
          </div>
          
          <PredictionHistory />
        </section>
        
        {/* Verification */}
        <section id="verification" className="py-16">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
              Trustless Verification
            </span>
            <h2 className="text-3xl font-medium">Verify Prediction Integrity</h2>
            <p className="text-foreground/70 mt-2 max-w-2xl mx-auto">
              Use our verification tool to confirm the authenticity and integrity of any prediction in our system.
            </p>
          </div>
          
          <VerificationPanel />
        </section>
        
        {/* About */}
        <section id="about" className="py-16">
          <div className="glass rounded-2xl p-8 md:p-12 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                  About the Project
                </span>
                <h2 className="text-3xl font-medium mb-4">Bringing Transparency to AI Predictions</h2>
                <p className="text-foreground/70 mb-6">
                  Our mission is to combine the power of artificial intelligence with the transparency and security of blockchain technology to create a trustless prediction system for cryptocurrency prices.
                </p>
                <p className="text-foreground/70 mb-6">
                  By recording AI-generated predictions on-chain, we eliminate concerns about retroactive modifications or selective reporting, ensuring complete transparency and accountability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a href="#" className="px-6 py-3 bg-primary text-white rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors text-center">
                    View Smart Contract
                  </a>
                  <a href="#" className="px-6 py-3 bg-secondary text-foreground/80 rounded-xl font-medium hover:bg-secondary/70 transition-colors text-center">
                    Technical Documentation
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-secondary/40 rounded-xl p-6 h-full">
                  <h3 className="text-lg font-medium mb-4">Technical Architecture</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Smart Contract Layer</h4>
                        <p className="text-sm text-foreground/70">EVM-compatible smart contract that records predictions, timestamps, and verification hashes.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">AI Prediction Engine</h4>
                        <p className="text-sm text-foreground/70">Advanced machine learning models that analyze market data to generate price forecasts.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Oracle Integration</h4>
                        <p className="text-sm text-foreground/70">Secure oracles that connect the AI system to the blockchain for automated updates.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Verification System</h4>
                        <p className="text-sm text-foreground/70">Cryptographic verification tools that ensure the integrity of recorded predictions.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium">User Interface</h4>
                        <p className="text-sm text-foreground/70">Intuitive interface for requesting predictions and verifying their authenticity.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-3xl p-8 md:p-16 text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Ready to Experience the Future of Predictions?</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Start using our AI-powered, blockchain-secured prediction system today and gain valuable insights for your crypto investments.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#request" className="px-8 py-4 bg-primary text-white rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors">
                Get Your First Prediction
              </a>
              <Link to="/nft-predictions" className="px-8 py-4 bg-white/90 text-foreground rounded-xl font-medium hover:bg-white transition-colors">
                Try NFT Predictions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
