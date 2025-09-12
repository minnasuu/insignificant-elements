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
import ComponentRenderer from '../ComponentRenderer'

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

  // 获取分类样式
  const getCategoryStyle = (category: string) => {
    const styles = {
      '样式': { background: '#f0f9ff', color: '#3b82f6' },
      '动画': { background: '#fffbeb', color: '#f59e0b' },
      '交互': { background: '#f0fdf4', color: '#16a34a' },
      '文案': { background: '#fdf2f8', color: '#ec4899' },
      default: { background: '#f0fdf4', color: '#16a34a' }
    };
    return styles[category as keyof typeof styles] || styles.default;
  }

  // 获取分类中文显示
  const getCategoryLabel = (key: string) => {
    const category = categories.find(c => c.key === key);
    return category ? category.label : key;
  }

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
      <div className="h-full flex gap-6 p-4">
        {/* 左侧表单区域 */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
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

        {/* 右侧预览区域 */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-0">
            <h3 className="text-sm font-medium text-gray-700 mb-4">预览效果</h3>
            <div className="flex flex-col gap-4 h-full border border-gray-100 rounded-[16px] p-4 bg-white">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm">{formData.title || '组件标题'}</h3>
                    {formData.origin_link && (
                      <div className="text-gray-400 text-sm">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.7073 9.56521L9.85801 24.4145C6.34329 27.9292 6.34329 33.6277 9.85801 37.1424V37.1424C13.3727 40.6571 19.0712 40.6571 22.5859 37.1424L40.2636 19.4647C42.6067 17.1216 42.6067 13.3226 40.2636 10.9794V10.9794C37.9205 8.63628 34.1215 8.63628 31.7783 10.9794L14.1007 28.6571C12.9291 29.8287 12.9291 31.7282 14.1007 32.8997V32.8997C15.2722 34.0713 17.1717 34.0713 18.3433 32.8997L33.1925 18.0505"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div
                    className="text-gray-500 text-xs px-2 py-1 rounded-md"
                    style={getCategoryStyle(getCategoryLabel(formData.category))}
                  >
                    {getCategoryLabel(formData.category)}
                  </div>
                </div>

                {formData.desc && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {formData.desc}
                    </p>
                  </div>
                )}

                {formData.tags && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {formData.tags.split(',').map((tag, index) => {
                      const trimmedTag = tag.trim();
                      return trimmedTag ? (
                        <span
                          key={index}
                          className="text-gray-500 text-xs border border-gray-100 rounded-md px-2 py-1 no-wrap"
                        >
                          {trimmedTag}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
                      <span className="text-xs text-gray-500 font-medium">
                        {user?.user_metadata?.username?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <span className="text-gray-600 text-xs truncate">
                      {user?.user_metadata?.username || "当前用户"}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="relative h-48 bg-white rounded-[12px] border border-gray-200 overflow-hidden">
                {formData.html || formData.css || formData.js ? (
                  <ComponentRenderer
                    html={formData.html}
                    css={formData.css}
                    js={formData.js}
                  />
                ) : (
                  <div className="flex gap-2 items-center justify-center h-full">
                    <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandDrawer>
  )
}

export default CreateDrawer