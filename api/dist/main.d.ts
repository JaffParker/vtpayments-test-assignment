import { INestApplication } from '@nestjs/common';
declare type App = INestApplication;
export declare type AppGetter = () => Promise<App>;
export declare const getApp: AppGetter;
export {};
