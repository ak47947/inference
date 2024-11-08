import {
  AddBoxOutlined,
  ChevronRightOutlined,
  DnsOutlined,
  GitHub,
  RocketLaunchOutlined,
  SmartToyOutlined,
} from '@mui/icons-material'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// import icon from '../media/icon.webp'
import icon from '../media/icon.png'

const navItems = [
  {
    text: '模型仓库',
    icon: <RocketLaunchOutlined />,
  },
  {
    text: '运行实例',
    icon: <SmartToyOutlined />,
  },
  {
    text: '注册模型',
    icon: <AddBoxOutlined />,
  },
  {
    text: '集群信息',
    icon: <DnsOutlined />,
  },
  {
    text: '联系我们',
    icon: <GitHub />,
  },
]

const MenuSide = () => {
  const theme = useTheme()
  const { pathname } = useLocation()
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const [drawerWidth, setDrawerWidth] = useState(
    `${Math.min(Math.max(window.innerWidth * 0.2, 287), 320)}px`
  )

  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])

  useEffect(() => {
    const screenWidth = window.innerWidth
    const maxDrawerWidth = Math.min(Math.max(screenWidth * 0.2, 287), 320)
    setDrawerWidth(`${maxDrawerWidth}px`)

    // Update the drawer width on window resize
    const handleResize = () => {
      const newScreenWidth = window.innerWidth
      const newMaxDrawerWidth = Math.min(
        Math.max(newScreenWidth * 0.2, 287),
        320
      )
      setDrawerWidth(`${newMaxDrawerWidth}px`)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        ...theme.mixins.toolbar,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Title */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box display="flex" m="2rem 1rem 0rem 1rem" width="217px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            textTransform="none"
          >
            <Box
              component="img"
              alt="profile"
              src={icon}
              height="60px"
              width="60px"
              borderRadius="50%"
              sx={{ objectFit: 'cover', mr: 1.5 }}
            />
            <Box textAlign="left">
              <Typography fontWeight="bold" fontSize="1.3rem">
                {'AIOps运管平台'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem"></Box>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                    {text}
                  </Typography>
                )
              }

              const link = text.toLowerCase().replace(' ', '_')

              return (
                <ListItem key={text}>
                  <ListItemButton
                    onClick={() => {
                      if (link === '联系我们') {
                        window.open(
                          'https://www.smartcitysz.com/',
                          '_blank',
                          'noreferrer'
                        )
                      } else if (link === '模型仓库') {
                        sessionStorage.setItem('modelType', '/launch_model/llm')
                        navigate('/launch_model/llm')
                        setActive(link)
                        sessionStorage.setItem('lastActiveUrl', link)
                        console.log(active)
                      } else if (link === '集群信息') {
                        navigate('/cluster_info')
                        setActive(link)
                      } else if (link === '运行实例') {
                        navigate('/running_models/LLM')
                        sessionStorage.setItem(
                          'runningModelType',
                          '/running_models/LLM'
                        )
                        setActive(link)
                        sessionStorage.setItem('lastActiveUrl', link)
                        console.log(active)
                      } else if (link === '注册模型') {
                        sessionStorage.setItem(
                          'registerModelType',
                          '/register_model/llm'
                        )
                        navigate('/register_model/llm')
                        setActive(link)
                        sessionStorage.setItem('lastActiveUrl', link)
                        console.log(active)
                      } else {
                        navigate(`/${link}`)
                        setActive(link)
                        console.log(active)
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: '2rem',
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    <ChevronRightOutlined sx={{ ml: 'auto' }} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}

export default MenuSide
