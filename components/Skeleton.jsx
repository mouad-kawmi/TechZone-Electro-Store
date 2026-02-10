
import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 border border-slate-100 dark:border-slate-800 flex flex-col space-y-6 animate-pulse">
    <div className="bg-slate-100 dark:bg-slate-800 rounded-[2rem] aspect-[4/3] w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
    </div>
    <div className="space-y-3 px-2">
      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/3"></div>
      <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded-full w-full"></div>
      <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3"></div>
    </div>
    <div className="flex justify-between items-center px-2 pt-4">
      <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-xl w-1/3"></div>
      <div className="size-14 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
    </div>
  </div>
);

export const SkeletonDetails = () => (
  <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-7 space-y-6">
        <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-[3.5rem]"></div>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-[2rem]"></div>)}
        </div>
      </div>
      <div className="lg:col-span-5 space-y-8">
        <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-full w-1/3"></div>
        <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] w-full"></div>
        <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2"></div>
        <div className="space-y-4 pt-12">
          <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>
          <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>
        </div>
      </div>
    </div>
  </div>
);
