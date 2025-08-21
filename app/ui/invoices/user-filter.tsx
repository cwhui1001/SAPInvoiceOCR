'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { CheckIcon, ChevronUpDownIcon, UserIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

interface UserFilterProps {
  users: { username: string; displayName: string }[];
}

export function UserFilter({ users }: UserFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentUser = searchParams.get('user') || '';

  function handleUserChange(newUser: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (newUser) {
      params.set('user', newUser);
    } else {
      params.delete('user');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const currentUserDisplay = currentUser 
    ? users.find(u => u.username === currentUser)?.displayName || currentUser
    : 'All Users';

  const userOptions = [
    { username: '', displayName: 'All Users' },
    ...users
  ];

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx(
        "flex h-10 items-center rounded-lg px-4 text-sm font-medium border transition-colors min-w-[140px] justify-between",
        currentUser 
          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
      )}>
        <div className="flex items-center truncate">
          <UserIcon className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">{currentUserDisplay}</span>
        </div>
        <ChevronUpDownIcon className="ml-2 h-4 w-4 flex-shrink-0" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-lg mt-1 p-2 w-56 border border-gray-200 z-50 max-h-64 overflow-y-auto"
          sideOffset={5}
        >
          <div className="flex flex-col">
            {userOptions.map((user) => (
              <button
                key={user.username}
                className={clsx(
                  'flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100 text-left',
                  user.username === currentUser && 'bg-green-50 text-green-700'
                )}
                onClick={() => {
                  handleUserChange(user.username);
                }}
              >
                <div className="flex items-center flex-grow">
                  <UserIcon className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{user.displayName}</span>
                </div>
                {user.username === currentUser && (
                  <CheckIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}