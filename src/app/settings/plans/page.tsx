import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Receipt } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const pricingPlans = [
  {
    title: 'Basic',
    isActive: true,
    description: 'Ideal for individuals and small teams.',
    monthlyAmount: 0.0,
    annualAmount: 0.0,
    featuresUnlocked: [
      'Access to basic tools',
      '10 GB storage',
      'Email support',
      'Basic analytics',
      'Community access',
    ],
  },
  {
    title: 'Premium',
    isActive: false,
    description: 'Perfect for larger teams and businesses.',
    monthlyAmount: 11.99,
    annualAmount: 99.99,
    featuresUnlocked: [
      'Access to all tools',
      '100 GB storage',
      'Priority email support',
      'Advanced analytics',
      'Customizable dashboards',
      'Team collaboration features',
      'Dedicated account manager',
    ],
  },
];

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div className="mt-2">
        <h3 className="text-lg font-medium">Billing Plans</h3>
        <p className="text-sm text-muted-foreground">
          Upgrade your current plan at any time to unlock additional features and resources
          that support your business growth.
        </p>
      </div>
      <Separator />
      <div className="flex space-x-4 ">
        {pricingPlans.map((plan, index) => (
          <Card className="w-[350px] h-[500px] shadow-none" key={index}>
            <CardHeader className="h-[150px]">
              <div
                className={`w-8 h-8 rounded-full ${
                  plan.title === 'Basic' ? 'bg-red-300' : 'bg-blue-200'
                }`}></div>
              <CardTitle className="text-xl font-semibold">{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="h-[350px] flex flex-col gap-4 py-4 ">
              <CardDescription className="h-[50px]">
                {plan.monthlyAmount === 0 && plan.annualAmount === 0 ? (
                  <CardDescription>
                    <span className="font-semibold text-xl">Free</span> <br />
                    Lorem ipsum, dolor sit amet con.
                  </CardDescription>
                ) : (
                  <>
                    <span className="font-semibold text-xl">${plan.annualAmount.toFixed(2)}</span>{' '}
                    per/year <br /> or{' '}
                    <strong>${plan.monthlyAmount.toFixed(2)} billed monthly</strong>
                  </>
                )}
              </CardDescription>
              {plan.isActive ? (
                <Button variant={'outline'} disabled className="bg-green-200 dark:text-gray-500">
                  Current Plan
                </Button>
              ) : (
                <Button variant={'default'}>Get started</Button>
              )}
              <p className="text-xs font-semibold"> {"What's included"}</p>
              <CardDescription className="text-xs flex flex-col gap-2 list-none">
                {plan.featuresUnlocked.map((feature, idx) => (
                  <li className="flex gap-2 items-center" key={idx}>
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <Alert className="bg-red-50 dark:bg-orange-600 dark:bg-opacity-10">
        <Receipt className="h-4 w-4" />
        <AlertTitle>Important Notice!</AlertTitle>
        <AlertDescription>
          Please note that pricing and billing terms are subject to change. Predictify reserves the
          right to discontinue or modify pricing plans, features, or billing cycles at any time.
          Changes will be communicated via email or through our website. In the event of any
          changes, you will have the option to continue or cancel your subscription as per our terms
          of service.
        </AlertDescription>
      </Alert>
    </div>
  );
}
