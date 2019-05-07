import React, { FC } from 'react'
import logo from '../Layout/Views/logo.png'
import styles from './Loading.module.scss'
import './LoadingAnimation.scss'

export const Loading: FC = () => (
  <div className={styles.Container}>
    <img src={logo} alt="Loading..." className={styles.Logo} />
  </div>
)
