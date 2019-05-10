import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'carbon-react/lib/components/button';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <div>
        <Link to='/'>
            <Button >Home</Button>
        </Link>
        <Link to='/pessoa'>
            <Button >Pessoa</Button>
        </Link>
    </div>
)

export default Header