import { Header } from '@/presentation/components/common/Header/Header';
import { ImageLink } from '@/presentation/components/common/ImageLink/ImageLink';
import { useLang } from '@/presentation/hooks/useLang';

export interface ErrorPageProps {
  title?: string;
}
export function ErrorPage({ title }: ErrorPageProps) {
  const { t } = useLang();
  return (
    <Header>
      <ImageLink />
      <p>{title || t.NETWORK_ISSUES}</p>
    </Header>
  );
}
