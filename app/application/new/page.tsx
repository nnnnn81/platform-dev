'use client';
import { ApplicationForm } from '../../components/ApplicationForm';

const NewApplicationPage = () => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl mb-4">新しい申請を行う</h1>
      <ApplicationForm />
    </div>
  );
};

export default NewApplicationPage;
