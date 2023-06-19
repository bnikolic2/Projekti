import React from 'react';
import { Container } from '@mui/material';

/**
 * @param {} children ReactElement
 * @param {} my String
 * @param {} centerX Boolean
 * @param {} centerY Boolean
 */
const PageContent = ({ children, my, centerX, centerY }) => {

    return (
        <Container sx={{
            minHeight: '100vh',
            paddingTop: my,
            paddingBottom: my,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: centerY ? 'center' : undefined,
            alignItems: centerX ? 'center' : undefined,
        }}>
            {children}
        </Container>
    );
};

export default PageContent;