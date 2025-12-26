import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import AdminPanel from './components/AdminPanel'
import ContactModal from './components/ContactModal'
import EditModal from './components/EditModal'
import ConfirmModal from './components/ConfirmModal'

console.log(import.meta.env.VITE_ADMIN_CODE)

const initialServices = [
  {
    title: 'Product strategy',
    description: 'Clarify the problem, define success, and turn fuzzy ideas into a focused roadmap and wireframes.',
    tags: ['Discovery', 'User flows', 'Prototyping'],
  },
  {
    title: 'Interface design',
    description: 'Design clean, modern interfaces that feel intentional, with reusable patterns and design systems.',
    tags: ['Design systems', 'UI/UX', 'Visual direction'],
  },
  {
    title: 'Full-Stack build',
    description:
      'Design and ship production-ready apps end-to-end: architect APIs, wire up data models, and deliver polished React experiences.',
    tags: ['Node.js', 'MongoDB', 'React', 'CI/CD'],
  },
]
const initialProjects = [
  {
    title: 'Project/Task Tracking Application',
    category: 'Product',
    timeline: '4-week prototype',
    description:
      'Led product design, managed front-end and back-end developers, and built the back-end for a custom Project/Task Tracking Application.',
    outcome: 'V 1.0 of the CollabBoard Tracking App.',
    tags: ['Product design', 'Design system', 'React build', 'Project Management'],
    link: 'https://github.com/IVY-CHRISTOPHER/CollabBoard-WIP',
  },
  {
    title: 'Color-Master',
    category: 'Product',
    timeline: '1-Week Challenge',
    description:
      'Created the backend and security features for a custom website allowing a new user to get random colors on page refresh, and create an account to save favorite colors',
    outcome: 'Color-Masters - A site to inspire you.',
    tags: ['Collaborative', 'Security', 'Back-end Arctitecture'],
    link: 'https://github.com/theGreatKyle1994/color-master',
  },
  {
    title: 'Movie-DB Project',
    category: 'Product',
    timeline: '24-Hour Challenge',
    description:
      'Created a lightweight movie Database that tapped into the IMBD API, and pulled the most recent and popular movies, also allowed the user to save favorite movies.',
    outcome: 'Movie DB Project.',
    tags: ['CSS Design', 'Front-End Development', 'Api Connections'],
    link: 'https://github.com/IVY-CHRISTOPHER/Movie_DB_Project',
  },
]

// Main app container: loads data, handles admin actions, and contact modal
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [servicesList, setServicesList] = useState(initialServices)
  const [projectList, setProjectList] = useState(initialProjects.map((project) => ({ ...project, photo: project.photo || '' })))
  const [dragTarget, setDragTarget] = useState('')
  const [isAdminPhotoDrag, setIsAdminPhotoDrag] = useState(false)
  const [adminForm, setAdminForm] = useState({
    mode: 'project',
    title: '',
    category: '',
    timeline: '',
    description: '',
    outcome: '',
    tags: '',
    link: '',
    photo: '',
  })
  const [adminMessage, setAdminMessage] = useState('')
  const [editModal, setEditModal] = useState({ type: '', item: null })
  const [editForm, setEditForm] = useState({})
  const [deleteModal, setDeleteModal] = useState({ type: '', item: null })
  const [isSending, setIsSending] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    topic: 'Start a project',
  })

  // Load projects and services from the API
  useEffect(() => {
    console.log(projectList)
    axios.get(import.meta.env.VITE_API_URL, {withCredentials: true})
    .then(res => setProjectList(res.data))
    .catch(err => console.log(err))
  },[projectList])

  // Open/close contact modal with preset topic
  const openModal = (topic) => {
    setFormData((prev) => ({ ...prev, topic }))
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false)
      return
    }
    const code = window.prompt('Enter admin access code')
    const allowedCode = import.meta.env.VITE_ADMIN_CODE
    if (code && code === allowedCode) {
      setIsAdmin(true)
    } else if (code !== null) {
      setAdminMessage('Access denied')
      setTimeout(() => setAdminMessage(''), 2000)
    }
  }

  const getProjectId = (project) => project._id || project.title

  // Persist project photo (optimistic update, then PATCH if it exists in DB)
  const persistProjectPhoto = async (project, photo) => {
    const targetId = getProjectId(project)
    const previousPhoto = project.photo || ''
    setProjectList((prev) => prev.map((p) => (getProjectId(p) === targetId ? { ...p, photo } : p)))

    if (!project._id) return

    try {
      const { data: saved } = await axios.patch(`/projects/${project._id}`, { photo })
      setProjectList((prev) => prev.map((p) => (getProjectId(p) === targetId ? { ...p, photo: saved?.photo || photo } : p)))
      setAdminMessage('Photo saved')
    } catch (err) {
      console.error(err)
      setAdminMessage('Could not save photo')
      setProjectList((prev) => prev.map((p) => (getProjectId(p) === targetId ? { ...p, photo: previousPhoto } : p)))
    } finally {
      setTimeout(() => setAdminMessage(''), 2000)
    }
  }

  // Prompt admin to add a photo URL to a project
  const handleAddPhoto = (project) => {
    if (!isAdmin) return
    const url = window.prompt('Enter a photo URL for this project')
    if (!url) return
    persistProjectPhoto(project, url)
  }

  // Drag/drop handlers for project photo updates
  const handleDragOver = (e, project) => {
    if (!isAdmin) return
    e.preventDefault()
    setDragTarget(getProjectId(project))
  }

  const handleDragLeave = (project) => {
    if (!isAdmin) return
    const targetId = getProjectId(project)
    setDragTarget((prev) => (prev === targetId ? '' : prev))
  }

  // Accept dropped image and attach to project
  const handleDropPhoto = (e, project) => {
    if (!isAdmin) return
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0]
    setDragTarget('')
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setAdminMessage('Please drop an image file')
      setTimeout(() => setAdminMessage(''), 2000)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      persistProjectPhoto(project, dataUrl)
    }
    reader.readAsDataURL(file)
  }

  // Drag/drop handlers for admin form photo field
  const handleAdminPhotoDrop = (e) => {
    if (!isAdmin || adminForm.mode !== 'project') return
    e.preventDefault()
    setIsAdminPhotoDrag(false)
    const file = e.dataTransfer?.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      setAdminMessage('Please drop an image file')
      setTimeout(() => setAdminMessage(''), 2000)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      setAdminForm((prev) => ({ ...prev, photo: dataUrl }))
    }
    reader.readAsDataURL(file)
  }

  const handleAdminPhotoDragOver = (e) => {
    if (!isAdmin || adminForm.mode !== 'project') return
    e.preventDefault()
    setIsAdminPhotoDrag(true)
  }

  const handleAdminPhotoDragLeave = () => {
    if (!isAdmin || adminForm.mode !== 'project') return
    setIsAdminPhotoDrag(false)
  }

  // Submit contact form to backend (with mailto fallback)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const successMessage = 'Message sent! I will reply within one business day.'
    const fallbackMessage = 'Could not send automatically; opening your email app instead.'
    const subject = encodeURIComponent(formData.topic || 'Project Inquiry')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\n${formData.message}`
    )
    setIsSending(true)
    try {
      await axios.post(`/api/contact`, formData)
      setAdminMessage(successMessage)
      setFormData({ name: '', email: '', message: '', topic: 'Start a project' })
      setIsModalOpen(false)
    } catch (err) {
      console.error('Contact send failed, falling back to mailto', err)
      setAdminMessage(fallbackMessage)
      window.location.href = `mailto:ivyssoftwaredevelopment@gmail.com?subject=${subject}&body=${body}`
      setIsModalOpen(false)
    } finally {
      setIsSending(false)
      setTimeout(
        () => setAdminMessage((current) => (current === successMessage || current === fallbackMessage ? '' : current)),
        4000
      )
    }
  }

  // Update admin form fields
  const handleAdminFormChange = (e) => {
    const { name, value } = e.target
    setAdminForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetAdminForm = () => {
    setAdminForm((prev) => ({
      mode: prev.mode,
      title: '',
      category: '',
      timeline: '',
      description: '',
      outcome: '',
      tags: '',
      link: '',
      photo: '',
    }))
  }

  // Create project or service via API and update local lists
  const handleAdminSubmit = async (e) => {
    e.preventDefault()
    if (!isAdmin) return
    setAdminMessage('Saving...')
    const payload =
      adminForm.mode === 'project'
        ? {
            title: adminForm.title,
            category: adminForm.category,
            timeline: adminForm.timeline,
            description: adminForm.description,
            outcome: adminForm.outcome,
            tags: adminForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
            link: adminForm.link,
            photo: adminForm.photo,
          }
        : {
            title: adminForm.title,
            description: adminForm.description,
            tags: adminForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
          }
    try {
      const endpoint = adminForm.mode === 'project' ? '/projects' : '/services'
      const { data: created } = await axios.post(`${endpoint}`, payload)
      if (adminForm.mode === 'project') {
        setProjectList((prev) => [{ ...created }, ...prev])
      } else {
        setServicesList((prev) => [{ ...created }, ...prev])
      }
      setAdminMessage('Saved!')
      resetAdminForm()
      setTimeout(() => setAdminMessage(''), 2000)
    } catch (err) {
      console.error(err)
      setAdminMessage('Save failed')
    }
  }

  // Open delete confirm for project
  const handleDeleteProject = async (project) => {
    if (!isAdmin) return
    setDeleteModal({ type: 'project', item: project })
  }

  // Open edit modal for project and prefill
  const handleEditProject = async (project) => {
    if (!isAdmin) return
    setEditModal({ type: 'project', item: project })
    setEditForm({
      title: project.title || '',
      description: project.description || '',
      category: project.category || '',
      timeline: project.timeline || '',
      outcome: project.outcome || '',
      link: project.link || '',
      photo: project.photo || '',
      tags: (project.tags || []).join(', '),
    })
  }

  // Open delete confirm for service
  const handleDeleteService = async (service) => {
    if (!isAdmin) return
    setDeleteModal({ type: 'service', item: service })
  }

  // Open edit modal for service and prefill
  const handleEditService = async (service) => {
    if (!isAdmin) return
    setEditModal({ type: 'service', item: service })
    setEditForm({
      title: service.title || '',
      description: service.description || '',
      tags: (service.tags || []).join(', '),
    })
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const closeEditModal = () => {
    setEditModal({ type: '', item: null })
    setEditForm({})
  }

  const closeDeleteModal = () => setDeleteModal({ type: '', item: null })

  // Persist edits for project/service and update local state
  const submitEdit = async () => {
    if (!editModal.item) return
    const tagsArray = (editForm.tags || '').split(',').map((t) => t.trim()).filter(Boolean)
    if (editModal.type === 'project') {
      const targetId = getProjectId(editModal.item)
      const payload = { ...editForm, tags: tagsArray }
      try {
        let saved = payload
        if (editModal.item._id) {
          const { data } = await axios.patch(`/projects/${editModal.item._id}`, payload)
          saved = data
        }
        setProjectList((prev) => prev.map((p) => (getProjectId(p) === targetId ? { ...p, ...saved } : p)))
        setAdminMessage('Project updated')
      } catch (err) {
        console.error(err)
        setAdminMessage('Could not update project')
      }
    } else if (editModal.type === 'service') {
      const targetId = editModal.item._id || editModal.item.title
      const payload = { ...editForm, tags: tagsArray }
      try {
        let saved = payload
        if (editModal.item._id) {
          const { data } = await axios.patch(`/services/${editModal.item._id}`, payload)
          saved = data
        }
        setServicesList((prev) => prev.map((s) => ((s._id || s.title) === targetId ? { ...s, ...saved } : s)))
        setAdminMessage('Service updated')
      } catch (err) {
        console.error(err)
        setAdminMessage('Could not update service')
      }
    }
    setTimeout(() => setAdminMessage(''), 2000)
    closeEditModal()
  }

  // Execute delete after confirm and update local lists
  const confirmDelete = async () => {
    if (!deleteModal.item) return
    const type = deleteModal.type
    try {
      if (type === 'project') {
        const targetId = getProjectId(deleteModal.item)
        if (deleteModal.item._id) {
          await axios.delete(`/projects/${deleteModal.item._id}`)
        }
        setProjectList((prev) => prev.filter((p) => getProjectId(p) !== targetId))
        setAdminMessage('Project deleted')
      } else if (type === 'service') {
        const targetId = deleteModal.item._id || deleteModal.item.title
        if (deleteModal.item._id) {
          await axios.delete(`/services/${deleteModal.item._id}`)
        }
        setServicesList((prev) => prev.filter((s) => (s._id || s.title) !== targetId))
        setAdminMessage('Service deleted')
      }
    } catch (err) {
      console.error(err)
      setAdminMessage('Delete failed')
    }
    setTimeout(() => setAdminMessage(''), 2000)
    closeDeleteModal()
  }

  return (
    <div className="page">
      <TopBar isAdmin={isAdmin} onAdminToggle={handleAdminToggle} />
      {adminMessage && <div className="status-banner">{adminMessage}</div>}

      <Hero onStartProject={() => openModal('Start a project')} />

      <main className="content">
        <ServicesSection
          servicesList={servicesList}
          isAdmin={isAdmin}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
        />

        <ProjectsSection
          projectList={projectList}
          isAdmin={isAdmin}
          dragTarget={dragTarget}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropPhoto}
          onAddPhoto={handleAddPhoto}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />

        <ContactSection onEmailClick={() => openModal('Project inquiry')} />

        {isAdmin && (
          <AdminPanel
            adminForm={adminForm}
            adminMessage={adminMessage}
            isAdminPhotoDrag={isAdminPhotoDrag}
            onModeChange={(mode) => setAdminForm((prev) => ({ ...prev, mode }))}
            onChange={handleAdminFormChange}
            onDrop={handleAdminPhotoDrop}
            onDragOver={handleAdminPhotoDragOver}
            onDragLeave={handleAdminPhotoDragLeave}
            onSubmit={handleAdminSubmit}
          />
        )}
      </main>

      <ContactModal
        isModalOpen={isModalOpen}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSending={isSending}
        closeModal={closeModal}
      />
      <EditModal
        isOpen={!!editModal.item}
        type={editModal.type}
        form={editForm}
        onChange={handleEditFormChange}
        onClose={closeEditModal}
        onSave={submitEdit}
      />
      <ConfirmModal isOpen={!!deleteModal.item} item={deleteModal.item} type={deleteModal.type} onCancel={closeDeleteModal} onConfirm={confirmDelete} />
    </div>
  )
}

export default App
