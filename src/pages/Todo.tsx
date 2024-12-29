import { faLeftLong, faUser } from '@fortawesome/free-solid-svg-icons';
import { withNavigation } from './withNavigation';
import { MainWrapper } from '../components/common/MainWrapper';
import { TopNav } from '../components/common/TopNav';

export const Todo = withNavigation(() => {
  return (
    <MainWrapper paddings="p-6" bgColor="bg-primary-100">
      <TopNav
        navIconInfos={[
          { id: faLeftLong, title: '이전 화면으로 되돌아가기', route: -1 },
          { id: faUser, title: '마이페이지로 이동하기', route: '/mypage' },
        ]}
        bgColor="bg-secondary-500"
        iconColor="text-neutral-600"
        title="일정 상세"
        titleColor="text-neutral-50"
      />
    </MainWrapper>
  );
});
