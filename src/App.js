import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">男娘家园</Link>
        <div className="space-x-4">
          <Link to="/database" className="text-gray-300 hover:text-white">游戏库</Link>
          <Link to="/search" className="text-gray-300 hover:text-white">搜索</Link>
          <Link to="/about" className="text-gray-300 hover:text-white">关于</Link>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">欢迎来到男娘家园</h1>
      <p className="text-lg mb-4">在这里，您可以：</p>
      <ul className="list-disc list-inside mb-4">
        <li>浏览各游戏中的男娘角色</li>
        <li>查看男娘角色数量和可爱度</li>
        <li>搜索特定游戏的男娘信息</li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">浏览游戏库</h2>
          <p className="mb-4">探索各个游戏中的可爱男娘角色。</p>
          <Link to="/database" className="text-blue-500 hover:text-blue-700">开始浏览 →</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">搜索男娘</h2>
          <p className="mb-4">快速找到您感兴趣的游戏和男娘。</p>
          <Link to="/search" className="text-blue-500 hover:text-blue-700">开始搜索 →</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">关于我们</h2>
          <p className="mb-4">了解我们的评分标准和收录原则。</p>
          <Link to="/about" className="text-blue-500 hover:text-blue-700">了解更多 →</Link>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">关于男娘家园</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">我们的使命</h2>
        <p className="mb-4">
          男娘家园致力于为玩家提供游戏中男娘角色的详细信息，帮助大家发现和了解这些可爱的角色。
          我们的评分团队会对每个游戏中的男娘角色进行仔细评估。
        </p>
        <h2 className="text-2xl font-bold mb-4">评分标准</h2>
        <ul className="list-disc list-inside mb-4">
          <li>角色设计</li>
          <li>性格特点</li>
          <li>剧情表现</li>
          <li>互动细节</li>
          <li>整体可爱度</li>
        </ul>
      </div>
    </div>
  );
}

function AddGameModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '开放世界',
    description: '',
    fullDescription: '',
    keyPoints: [''],
    researchTeam: [''],
    femboyCount: 0,
    cuteness: 50
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('添加失败');
      }
      
      const newGame = await response.json();
      onAdd(newGame);
      onClose();
    } catch (error) {
      alert('添加游戏失败：' + error.message);
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">新增游戏</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">游戏名称</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">类别</label>
            <select
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="开放世界">开放世界</option>
              <option value="回合策略">回合策略</option>
              <option value="塔防">塔防</option>
              <option value="动作">动作</option>
              <option value="冒险">冒险</option>
              <option value="角色扮演">角色扮演</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">简介</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded"
              rows="2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">详细介绍</label>
            <textarea
              value={formData.fullDescription}
              onChange={e => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block mb-1">男娘角色</label>
            {formData.keyPoints.map((point, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={e => handleArrayChange('keyPoints', index, e.target.value)}
                  className="flex-grow p-2 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('keyPoints', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  删除
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('keyPoints')}
              className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              添加角色
            </button>
          </div>

          <div>
            <label className="block mb-1">制作团队</label>
            {formData.researchTeam.map((member, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={member}
                  onChange={e => handleArrayChange('researchTeam', index, e.target.value)}
                  className="flex-grow p-2 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('researchTeam', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  删除
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('researchTeam')}
              className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              添加团队
            </button>
          </div>

          <div>
            <label className="block mb-1">男娘数量</label>
            <input
              type="number"
              min="0"
              value={formData.femboyCount}
              onChange={e => setFormData(prev => ({ ...prev, femboyCount: parseInt(e.target.value) }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">可爱度 (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.cuteness}
              onChange={e => setFormData(prev => ({ ...prev, cuteness: parseInt(e.target.value) }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Database() {
  const [category, setCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchProjects();
  }, [category]);

  const fetchProjects = async () => {
    try {
      const url = category === 'all' 
        ? '/api/database'
        : `/api/database?category=${encodeURIComponent(category)}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      setError('加载失败，请稍后重试');
      setLoading(false);
    }
  };

  const handleAddGame = (newGame) => {
    setProjects(prev => [...prev, newGame]);
  };

  if (loading) return <div className="text-center p-4">加载中...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">游戏库</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          新增游戏
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2">选择类型：</label>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">全部</option>
          <option value="开放世界">开放世界</option>
          <option value="回合策略">回合策略</option>
          <option value="塔防">塔防</option>
          <option value="动作">动作</option>
          <option value="冒险">冒险</option>
          <option value="角色扮演">角色扮演</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} 
               className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
               onClick={() => navigate(`/database/${project.id}`)}>
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-2">{project.category}</p>
            <p className="mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <div className="text-blue-600">
                男娘数量: {project.details.femboyCount}
              </div>
              <div className="text-pink-600">
                可爱度: {project.details.cuteness}/100
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddGame}
      />
    </div>
  );
}

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      setError('搜索失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">搜索男娘</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="输入游戏名称、男娘角色或关键词"
            className="flex-grow p-2 border rounded"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? '搜索中...' : '搜索'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {hasSearched && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {searchResults.length > 0 
              ? `找到 ${searchResults.length} 条相关游戏` 
              : '未找到相关游戏'}
          </h2>
          {searchResults.length === 0 && (
            <p className="text-gray-600">
              试试使用其他关键词，或者浏览我们的
              <Link to="/database" className="text-blue-500 hover:text-blue-700 mx-1">
                游戏库
              </Link>
              查找更多游戏。
            </p>
          )}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((result) => (
            <div key={result.id} className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/database/${result.id}`)}>
              <h2 className="text-xl font-bold mb-2">{result.title}</h2>
              <p className="text-gray-600 mb-2">{result.category}</p>
              <p className="mb-4">{result.description}</p>
              <button className="text-blue-500 hover:text-blue-700">查看详情 →</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const id = window.location.pathname.split('/').pop();
        const response = await fetch(`/api/database/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch project details');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-4">加载中...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!project) return <div className="text-center p-4">未找到游戏</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 mb-4">{project.category}</p>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">简介</h2>
          <p>{project.description}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">详细信息</h2>
          <p>{project.details.fullDescription}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">男娘角色</h2>
          <div className="flex flex-wrap gap-2">
            {project.details.keyPoints.map((point, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full">
                {point}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">制作团队</h2>
          <div className="flex flex-wrap gap-2">
            {project.details.researchTeam.map((member, index) => (
              <span key={index} className="bg-blue-100 px-3 py-1 rounded-full">
                {member}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">男娘数量</h2>
            <p className="text-4xl font-bold text-blue-600">{project.details.femboyCount}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">可爱度</h2>
            <div className="flex items-center">
              <p className="text-4xl font-bold text-pink-600">{project.details.cuteness}</p>
              <span className="ml-2 text-gray-600">/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/database" element={<Database />} />
          <Route path="/database/:id" element={<ProjectDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
