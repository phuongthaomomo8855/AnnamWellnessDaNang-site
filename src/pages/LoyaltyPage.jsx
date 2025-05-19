import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Mail, UserPlus, LogIn, Gift, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoyaltyPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthAction = (actionType) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically handle actual authentication logic
      // For now, just log the action
      console.log(`${actionType} attempt`);
      if (actionType === "Sign In") {
        // Redirect to a dashboard or show success message
      } else {
        // Redirect to further registration steps or show success
      }
    }, 1500);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
    out: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  const benefits = [
    { icon: <Gift className="w-6 h-6 text-primary" />, title: "Exclusive Discounts", description: "Enjoy special rates on rooms, spa treatments, and dining." },
    { icon: <Sparkles className="w-6 h-6 text-secondary" />, title: "Early Access & Upgrades", description: "Get priority check-in, room upgrades (subject to availability), and early access to promotions." },
    { icon: <Crown className="w-6 h-6 text-amber-500" />, title: "Reward Points", description: "Earn points for every stay and redeem them for unique experiences and rewards." },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-rose-50 py-12 md:py-20 flex items-center justify-center px-4"
    >
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary-dark mb-4">
            Join Our Loyalty Circle
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Become an Annam Wellness Insider and unlock a world of exclusive benefits, personalized experiences, and rewards designed to enhance your journey with us.
          </p>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15, ease: "easeOut" }}
                className="flex items-start space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-stone-200"
              >
                <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="text-md font-semibold text-heading-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
           <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            className="mt-8 text-center lg:text-left"
          >
            <Link to="/membership">
              <Button variant="link" className="text-primary hover:text-primary-dark text-md">
                Explore Membership Tiers <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <Card className="w-full shadow-xl border-stone-200/80 bg-card/90 backdrop-blur-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-semibold text-primary-dark">
                Member Access
              </CardTitle>
              <CardDescription>
                Sign in to your account or create a new one to start enjoying your benefits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-stone-200/70">
                  <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </TabsTrigger>
                  <TabsTrigger value="join" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
                    <UserPlus className="mr-2 h-4 w-4" /> Join Now
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={(e) => { e.preventDefault(); handleAuthAction("Sign In"); }} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-email">Email or Membership ID</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="signin-email" type="email" placeholder="your.email@example.com" className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-password">Password</Label>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="signin-password" type="password" placeholder="••••••••" className="pl-10" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-button text-white button-glow-effect" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="join">
                  <form onSubmit={(e) => { e.preventDefault(); handleAuthAction("Join"); }} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="join-name">Full Name</Label>
                       <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="join-name" type="text" placeholder="e.g., Alex Nguyen" className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="join-email">Email Address</Label>
                       <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="join-email" type="email" placeholder="your.email@example.com" className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="join-password">Create Password</Label>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="join-password" type="password" placeholder="Choose a strong password" className="pl-10" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-button text-white button-glow-effect" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
              By joining, you agree to our Loyalty Program Terms and Privacy Policy.
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoyaltyPage;