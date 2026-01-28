import ErrorState from '@/components/ui/ErrorState';

export default function NotFound() {
  return (
    <ErrorState
      title="Vendor Not Found"
      message="The vendor you're looking for doesn't exist or may have been removed."
      action={{
        label: 'Browse All Vendors',
        onClick: () => {
          window.location.href = '/';
        },
      }}
    />
  );
}