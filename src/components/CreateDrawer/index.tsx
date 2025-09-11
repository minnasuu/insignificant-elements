import { 
  LandDrawer, 
  type DrawerProps,
  LandRadioGroup,
  LandInput
} from '@suminhan/land-design'
import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { createComponent, type CreateComponentData } from '../../services/componentService'
import CodeEditor from '../CodeEditor'

interface CategoryOption {
  key: string;
  label: string;
}

type Props = {
  initialCategory?: string;
  onSuccess?: () => void;
} & DrawerProps

const CreateDrawer: React.FC<Props> = ({
  initialCategory = 'style',
  onSuccess,
  ...restProps
}) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: initialCategory,
    desc: '',
    html: '',
    css: '',
    js: '',
    tags: '',
    origin_link: ''
  })

  const categories: CategoryOption[] = [
    { key: 'style', label: '样式' },
    { key: 'animation', label: '动画' },
    { key: 'interaction', label: '交互' },
    { key: 'copywriting', label: '文案' },
    { key: 'other', label: '其他' }
  ]

  // 当初始类别变化时更新表单
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      category: initialCategory
    }))
  }, [initialCategory])


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 获取当前登录用户的ID
  const getCurrentUserId = (): string | null => {
    if (!user || !user.id) {
      return null
    }
    return user.id
  }

  const showMessage = (message: string, type: 'success' | 'error' = 'error') => {
    // 简单的消息提示实现
    const messageEl = document.createElement('div')
    messageEl.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    messageEl.textContent = message
    document.body.appendChild(messageEl)
    
    setTimeout(() => {
      document.body.removeChild(messageEl)
    }, 3000)
  }

  const handleSubmit = async () => {
    // 获取当前登录用户ID
    const currentUserId = getCurrentUserId()
    if (!currentUserId) {
      showMessage('用户未登录，请先登录')
      return
    }

    if (!formData.title.trim()) {
      showMessage('请输入标题')
      return
    }

    if (!formData.category) {
      showMessage('请选择类别')
      return
    }

    setLoading(true)
    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const componentData: CreateComponentData = {
        title: formData.title.trim(),
        category: formData.category,
        desc: formData.desc.trim() || undefined,
        html: formData.html.trim(),
        css: formData.css.trim(),
        js: formData.js.trim(),
        tags,
        origin_link: formData.origin_link.trim() || undefined,
        user_id: currentUserId
      }

      await createComponent(componentData)
      
      showMessage('创建成功！', 'success')
      
      // 重置表单
      setFormData({
        title: '',
        category: initialCategory,
        desc: '',
        html: '',
        css: '',
        js: '',
        tags: '',
        origin_link: ''
      })

      // 调用成功回调
      onSuccess?.()
    } catch (error) {
      console.error('创建组件失败:', error)
      showMessage('创建失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const submitDisabled = useMemo(() => {
    return loading || !formData.title || !formData.category || !formData.html
  }, [loading, formData])

  return (
    <LandDrawer
      mask
      title="创建新组件"
      size="large"
      onSubmit={handleSubmit}
      submitLabel= {loading ? '创建中...' : '确定创建'}
      cancelLabel="重置"
      submitDisabled={submitDisabled}
      onCancel={() => {
        setFormData({
          title: '',
          category: initialCategory,
          desc: '',
          html: '',
          css: '',
          js: '',
          tags: '',
          origin_link: ''
        })
      }}
      {...restProps}
    >
      <div className="h-full flex flex-col gap-4 p-4 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">标题 *</label>
          <LandInput
            type="border"
            value={formData.title}
            onChange={(value) => handleInputChange('title', value)}
            placeholder="请输入组件标题"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">类别 *</label>
          <LandRadioGroup
            checked={formData.category}
            onChange={(value) => handleInputChange('category', value)}
            data={categories}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
          <LandInput
            type="border"
            value={formData.desc}
            onChange={(value) => handleInputChange('desc', value)}
            placeholder="请输入组件描述（可选）"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">原始链接</label>
          <LandInput
            type="border"
            value={formData.origin_link}
            onChange={(value) => handleInputChange('origin_link', value)}
            placeholder="请输入原始链接（可选）"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">HTML</label>
          <CodeEditor
            value={formData.html}
            onChange={(value) => handleInputChange('html', value)}
            language="html"
            placeholder="请输入HTML代码"
            height="200px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CSS</label>
          <CodeEditor
            value={formData.css}
            onChange={(value) => handleInputChange('css', value)}
            language="css"
            placeholder="请输入CSS代码"
            height="200px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">JavaScript</label>
          <CodeEditor
            value={formData.js}
            onChange={(value) => handleInputChange('js', value)}
            language="javascript"
            placeholder="请输入JavaScript代码"
            height="200px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
          <LandInput
            type="border"
            value={formData.tags}
            onChange={(value) => handleInputChange('tags', value)}
            placeholder="请输入标签，用逗号分隔"
          />
        </div>
      </div>
    </LandDrawer>
  )
}

export default CreateDrawer