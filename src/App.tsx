/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { LiveCalculator } from './components/LiveCalculator';
import { MockupPreflight } from './components/MockupPreflight';
import { OrderTracker } from './components/OrderTracker';
import { WorkshopCoverage } from './components/WorkshopCoverage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { PrintProduct } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('catalogo');
  const [productForQuote, setProductForQuote] = useState<PrintProduct | null>(null);
  const [productForModal, setProductForModal] = useState<PrintProduct | null>(null);

  const handleSelectProductForQuote = (product: PrintProduct) => {
    setProductForQuote(product);
    setActiveTab('cotizador');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetail = (product: PrintProduct) => {
    setProductForModal(product);
  };

  const handleOpenCalculatorFromModal = (product: PrintProduct) => {
    setProductForQuote(product);
    setActiveTab('cotizador');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendToCalculatorFromMockup = (title: string) => {
    setActiveTab('cotizador');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMockupWithConfig = (width: number, height: number, title: string) => {
    setActiveTab('mockup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#081325] text-[#d8e2fc] flex flex-col font-sans selection:bg-[#e6007e] selection:text-white">
      {/* Top Navigation Bar with Strict Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuickQuote={() => {
          setActiveTab('cotizador');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section is displayed on Catalog and General overview */}
        {activeTab === 'catalogo' && (
          <>
            <Hero
              onStartQuote={() => {
                setActiveTab('cotizador');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreCatalog={() => {
                const element = document.getElementById('catalogo');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <CatalogSection
              onSelectProductForQuote={handleSelectProductForQuote}
              onOpenProductDetail={handleOpenProductDetail}
            />

            <WorkshopCoverage />
          </>
        )}

        {/* Dedicated Interactive Live Calculator Screen */}
        {activeTab === 'cotizador' && (
          <div className="pt-4">
            <LiveCalculator
              initialProduct={productForQuote}
              onOpenMockupWithConfig={handleOpenMockupWithConfig}
            />
          </div>
        )}

        {/* Pre-Prensa & 3D Mockup Screen */}
        {activeTab === 'mockup' && (
          <div className="pt-4">
            <MockupPreflight onSendToCalculator={handleSendToCalculatorFromMockup} />
          </div>
        )}

        {/* Real-time Order Tracking Screen */}
        {activeTab === 'seguimiento' && (
          <div className="pt-4">
            <OrderTracker />
          </div>
        )}

        {/* Workshop & Selva Central Coverage Screen */}
        {activeTab === 'taller' && (
          <div className="pt-4">
            <WorkshopCoverage />
          </div>
        )}
      </main>

      {/* Product Specification Detail Modal */}
      <ProductDetailModal
        product={productForModal}
        onClose={() => setProductForModal(null)}
        onOpenCalculator={handleOpenCalculatorFromModal}
      />

      {/* Floating Emerald WhatsApp Pod */}
      <FloatingWhatsApp />

      {/* Modern Industrial Dark Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
