'use client'

import React from 'react'
import Image from 'next/image'
import { Phone, Clock, Shield, Award, CheckCircle } from 'lucide-react'

export function CampaignFooter() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Trust & Credibility */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Trust & Quality</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-accent" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-accent" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>5,000+ Projects Completed</span>
              </div>
            </div>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span>1 (555) 555-5555</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <span>Mon-Fri: 8am-7pm</span>
              </div>
              <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-sm transition-colors">
                Schedule Free Consultation
              </button>
            </div>
          </div>

          {/* Assurance */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Our Guarantees</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span>Lifetime warranty on materials</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span>Clean job site guarantee</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span>Special financing available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Mid America Bathworks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 