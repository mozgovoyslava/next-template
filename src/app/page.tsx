import { Counter } from '@/features/counter';
import { UsersList } from '@/widgets/usersList';
import { Button } from '@/shared/ui';

export default function Home() {
    return (
        <main>
            <h1 data-testid="header">asdasd</h1>

            <Button>Кнопка</Button>
            <Counter />
            <UsersList />
        </main>
    );
}
