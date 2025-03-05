
import React from 'react';
import Layout from '@/components/Layout';
import NFTSearchForm from '@/components/NFTSearchForm';
import NFTPredictionHistory from '@/components/NFTPredictionHistory';
import HomeButton from '@/components/HomeButton';

const NFTPredictions = () => {
  return (
    <Layout>
      <div className="container mx-auto pt-24 px-4">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-slide-down">
            <div className="inline-block mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                AI + NFT Analytics
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
              AI-Generated <span className="text-primary">NFT</span> Floor Price Predictions
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover the future value of NFT collections with our AI-powered floor price prediction engine.
            </p>
            <div className="flex justify-center">
              <HomeButton />
            </div>
          </div>
        </section>
        
        {/* NFT Search and Prediction Section */}
        <section className="py-8">
          <NFTSearchForm />
        </section>
        
        {/* NFT Prediction History */}
        <section className="py-16">
          <NFTPredictionHistory />
        </section>
        
        {/* Education Section */}
        <section className="py-16 mb-8">
          <div className="glass rounded-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl font-medium mb-6">How NFT Floor Price Predictions Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Data Collection</h3>
                    <p className="text-foreground/70">
                      Our AI analyzes vast amounts of historical sale data, trading volume, holder distribution, and collection metrics to establish baseline patterns.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Market Sentiment Analysis</h3>
                    <p className="text-foreground/70">
                      We track social media engagement, Discord activity, community growth, and overall market sentiment to gauge interest levels.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Blockchain Activity</h3>
                    <p className="text-foreground/70">
                      Our algorithms monitor on-chain metrics like wallet concentration, diamond hands ratio, and listing/delisting patterns.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Project Roadmap Analysis</h3>
                    <p className="text-foreground/70">
                      We evaluate upcoming features, partnerships, utility releases, and project milestones that could impact collection value.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl font-medium">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Broader Market Conditions</h3>
                    <p className="text-foreground/70">
                      We factor in overall crypto market conditions, ETH/SOL price trends, and general NFT market liquidity.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl font-medium">6</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">AI Prediction Synthesis</h3>
                    <p className="text-foreground/70">
                      Our advanced AI models combine all these factors to generate floor price predictions with confidence scores and supporting rationale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default NFTPredictions;
