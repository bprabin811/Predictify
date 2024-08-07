import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6 px-2 pr-4">
      <div className="mt-2">
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
