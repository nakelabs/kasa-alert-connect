
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Users, MessageSquare, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: 'Instant Alerts',
      description: 'Send emergency alerts to thousands of recipients simultaneously via SMS'
    },
    {
      icon: Users,
      title: 'Multi-Agency Platform',
      description: 'Secure platform where each agency manages their own data and recipients'
    },
    {
      icon: MessageSquare,
      title: 'Two-Way Communication',
      description: 'Receive and track replies from alert recipients in real-time'
    },
    {
      icon: Globe,
      title: 'Location-Based Targeting',
      description: 'Send targeted alerts based on geographic regions and demographics'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Enterprise-grade infrastructure ensures messages are delivered quickly'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Bank-level security with complete data isolation between agencies'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold">KASA</h1>
                <p className="text-sm text-blue-100">Keep All Safe & Alert</p>
              </div>
            </div>
            <Link to="/login">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Agency Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Multi-Agency Emergency Alert Platform
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            KASA enables emergency response agencies to coordinate and communicate effectively during critical situations. 
            Send targeted SMS alerts, track delivery status, and manage recipient responses all in one secure platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Access Your Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Emergency Response
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything your agency needs to communicate effectively during emergencies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Emergency Agencies
            </h3>
            <p className="text-lg text-gray-600">
              KASA serves a wide range of emergency response organizations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Red Cross Emergency Response',
              'Health Authority',
              'Fire & Rescue Service',
              'Police Department'
            ].map((agency, index) => (
              <div key={index} className="text-center p-6 bg-blue-50 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">{agency}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the agencies already using KASA to keep their communities safe and informed
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Sign In to Your Agency Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-8 w-8" />
            <div>
              <h5 className="text-lg font-bold">KASA</h5>
              <p className="text-sm text-gray-400">Keep All Safe & Alert</p>
            </div>
          </div>
          <p className="text-center text-gray-400">
            © 2024 KASA Emergency Alert Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
