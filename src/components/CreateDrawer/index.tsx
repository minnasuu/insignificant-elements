import { 
  LandDrawer, 
  type DrawerProps,
  LandRadioGroup,
  LandInput,
  Icon
} from '@suminhan/land-design'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { createComponent, updateComponent, type CreateComponentData, type UpdateComponentData } from '../../services/componentService'
import type { ComponentItem } from '../../types'
import CodeEditor from '../CodeEditor'
import ComponentRenderer from '../ComponentRenderer'

interface CategoryOption {
  key: string;
  label: string;
}

type Props = {
  initialCategory?: string;
  onSuccess?: () => void;
  editingComponent?: ComponentItem | null;
} & DrawerProps

const CreateDrawer: React.FC<Props> = ({
  initialCategory = 'style',
  onSuccess,
  editingComponent,
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
    tags: [] as string[],
    origin_link: ''
  })

  const isEditMode = !!editingComponent
  
  // 本地缓存key
  const CACHE_KEY = 'create_drawer_form_data'

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
      'style': { background: '#f0f9ff', color: '#3b82f6' },
      'animation': { background: '#fffbeb', color: '#f59e0b' },
      'interaction': { background: '#f0fdf4', color: '#16a34a' },
      'copywriting': { background: '#fdf2f8', color: '#ec4899' },
      'other': { background: '#f0fdf4', color: '#16a34a' },
      default: { background: '#f0fdf4', color: '#16a34a' }
    };
    return styles[category as keyof typeof styles] || styles.default;
  }

  // 获取分类中文显示
  const getCategoryLabel = (key: string) => {
    const category = categories.find(c => c.key === key);
    return category ? category.label : key;
  }

  // 保存表单数据到本地缓存
  const saveToCache = useCallback(() => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(formData))
      showMessage('已保存到本地缓存', 'success')
    } catch (error) {
      console.error('保存到缓存失败:', error)
      showMessage('保存到缓存失败')
    }
  }, [formData])

  // 从本地缓存加载表单数据
  const loadFromCache = useCallback(() => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (cachedData) {
        const parsedData = JSON.parse(cachedData)
        return parsedData
      }
    } catch (error) {
      console.error('从缓存加载失败:', error)
    }
    return null
  }, [])

  // 清空本地缓存
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY)
    } catch (error) {
      console.error('清空缓存失败:', error)
    }
  }, [])

  // 处理键盘快捷键
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // 检测 Cmd+S (Mac) 或 Ctrl+S (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      event.preventDefault() // 阻止浏览器默认保存行为
      saveToCache()
    }
  }, [saveToCache])

  // 当编辑组件或初始类别变化时更新表单
  useEffect(() => {
    if (editingComponent) {
      // 编辑模式：填入组件数据
      setFormData({
        title: editingComponent.title,
        category: editingComponent.category,
        desc: editingComponent.desc || '',
        html: editingComponent.html || '',
        css: editingComponent.css || '',
        js: editingComponent.js || '',
        tags: editingComponent.tags || [],
        origin_link: editingComponent.origin_link || ''
      })
    } else {
      // 创建模式：尝试从缓存加载，否则使用默认值
      const cachedData = loadFromCache()
      if (cachedData) {
        setFormData({
          ...cachedData,
          category: cachedData.category || initialCategory
        })
      } else {
        setFormData(prev => ({
          ...prev,
          category: initialCategory
        }))
      }
    }
  }, [editingComponent, initialCategory, loadFromCache])

  // 添加键盘事件监听器
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTagsChange = (tags: string[]) => {
    setFormData(prev => ({
      ...prev,
      tags: tags
    }))
  }

  // 标签输入组件
  const TagsInput: React.FC<{ value: string[], onChange: (tags: string[]) => void, placeholder?: string }> = ({ 
    value, 
    onChange, 
    placeholder 
  }) => {
    const [inputValue, setInputValue] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault()
        const newTag = inputValue.trim()
        if (!value.includes(newTag)) {
          onChange([...value, newTag])
        }
        setInputValue('')
      } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
        // 当输入框为空且按下退格键时，删除最后一个标签
        onChange(value.slice(0, -1))
      }
    }

    const removeTag = (indexToRemove: number) => {
      onChange(value.filter((_, index) => index !== indexToRemove))
    }

    return (
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg min-h-[40px]">
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 bg-white text-gray-800 text-sm rounded-md"
          >
            {tag}
            <Icon name="close" size={16} className='cursor-pointer color-gray-600 hover:color-gray-800' onClick={() => removeTag(index)}/>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] text-sm outline-none border-none bg-transparent"
        />
      </div>
    )
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
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      if (isEditMode && editingComponent) {
        // 编辑模式：更新组件
        const updateData: UpdateComponentData = {
          title: formData.title.trim(),
          category: formData.category,
          desc: formData.desc.trim() || undefined,
          html: formData.html.trim(),
          css: formData.css.trim(),
          js: formData.js.trim(),
          tags,
          origin_link: formData.origin_link.trim() || undefined,
        }

        await updateComponent(editingComponent.id, updateData)
        showMessage('更新成功！', 'success')
      } else {
        // 创建模式：创建新组件
        const currentUserId = getCurrentUserId()
        if (!currentUserId) {
          showMessage('用户未登录，请先登录')
          return
        }

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
      }
      
      // 重置表单（仅在创建模式下）
      if (!isEditMode) {
        setFormData({
          title: '',
          category: initialCategory,
          desc: '',
          html: '',
          css: '',
          js: '',
          tags: [],
          origin_link: ''
        })
        clearCache() // 创建成功后清空缓存
      }

      // 调用成功回调
      onSuccess?.()
    } catch (error) {
      console.error(isEditMode ? '更新组件失败:' : '创建组件失败:', error)
      showMessage(isEditMode ? '更新失败，请重试' : '创建失败，请重试')
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
      title={isEditMode ? "编辑组件" : "新建组件"}
      size="large"
      onSubmit={handleSubmit}
      submitLabel={loading ? (isEditMode ? '更新中...' : '创建中...') : (isEditMode ? '确定更新' : '确定创建')}
      cancelLabel={isEditMode ? "取消" : "重置"}
      submitDisabled={submitDisabled}
      onCancel={() => {
        if (!isEditMode) {
          setFormData({
            title: '',
            category: initialCategory,
            desc: '',
            html: '',
            css: '',
            js: '',
            tags: [],
            origin_link: ''
          })
          clearCache() // 清空本地缓存
        }
      }}
      {...restProps}
    >
      <div className="h-full flex">
        {/* 左侧表单区域 */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-4 border-r border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">标题 <span className="text-red-500">*</span></label>
          <LandInput
            type="background"
            value={formData.title}
            onChange={(value) => handleInputChange('title', value)}
            placeholder="请输入组件标题"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">类别 <span className="text-red-500">*</span></label>
          <LandRadioGroup
            checked={formData.category}
            onChange={(value) => handleInputChange('category', value)}
            data={categories}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
          <LandInput
            type="background"
            value={formData.desc}
            onChange={(value) => handleInputChange('desc', value)}
            placeholder="请输入组件描述（可选）"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">原始链接</label>
          <LandInput
            type="background"
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
          {/* <LandInput
            type="background"
            value={formData.tags}
            onChange={(value) => handleInputChange('tags', value)}
            placeholder="请输入标签，用逗号分隔"
          /> */}
          <TagsInput
            value={formData.tags}
            onChange={handleTagsChange}
            placeholder="请输入标签，按回车添加"
          />
        </div>
        </div>

        {/* 右侧预览区域 */}
        <div className="max-w-80 min-w-60 p-4 flex-shrink-0">
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

                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {formData.tags.map((tag, index) => {
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
                    <div className="preview-element w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="preview-element w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="preview-element w-2 h-2 bg-gray-300 rounded-full"></div>
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