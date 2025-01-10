import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';

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
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState({
    fullDescription: '',
    keyPoints: [],
    researchTeam: [],
    femboyCount: 0,
    cuteness: 0,
    femboyCharacters: [],
    gameTags: [],
    releaseDate: '',
    developer: '',
    platforms: [],
    ageRating: '',
    price: 0,
    discount: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const processMultiValue = (value) => 
      typeof value === 'string' ? value.split(',').map(v => v.trim()).filter(v => v) : value;

    const processedDetails = {
      ...details,
      keyPoints: processMultiValue(details.keyPoints),
      researchTeam: processMultiValue(details.researchTeam),
      gameTags: processMultiValue(details.gameTags),
      platforms: processMultiValue(details.platforms)
    };

    const newProject = {
      title,
      category,
      description,
      details: processedDetails
    };

    try {
      const response = await fetch('/api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject)
      });

      if (response.ok) {
        onAdd();
        onClose();
      } else {
        const errorData = await response.json();
        alert(`添加失败: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('添加游戏时发生错误');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">添加新游戏</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">游戏标题</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required 
              />
            </div>
            <div>
              <label className="block mb-2">游戏类别</label>
              <input 
                type="text" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
                required 
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">简短描述</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                required 
              />
            </div>
            
            <div>
              <label className="block mb-2">详细描述</label>
              <textarea 
                value={details.fullDescription}
                onChange={(e) => setDetails({...details, fullDescription: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">关键词 (逗号分隔)</label>
              <input 
                type="text" 
                value={details.keyPoints}
                onChange={(e) => setDetails({...details, keyPoints: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">研究团队 (逗号分隔)</label>
              <input 
                type="text" 
                value={details.researchTeam}
                onChange={(e) => setDetails({...details, researchTeam: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">男娘数量</label>
              <input 
                type="number" 
                value={details.femboyCount}
                onChange={(e) => setDetails({...details, femboyCount: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">可爱度</label>
              <input 
                type="number" 
                value={details.cuteness}
                onChange={(e) => setDetails({...details, cuteness: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2">男娘角色 (JSON格式)</label>
              <textarea 
                value={JSON.stringify(details.femboyCharacters)}
                onChange={(e) => {
                  try {
                    const chars = JSON.parse(e.target.value);
                    setDetails({...details, femboyCharacters: chars});
                  } catch (err) {
                    console.error('Invalid JSON');
                  }
                }}
                className="w-full p-2 border rounded"
                placeholder='[{"name": "小樱", "age": 18, "description": "可爱的男娘法师"}]'
              />
            </div>
            <div>
              <label className="block mb-2">游戏标签 (逗号分隔)</label>
              <input 
                type="text" 
                value={details.gameTags}
                onChange={(e) => setDetails({...details, gameTags: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">发行日期</label>
              <input 
                type="date" 
                value={details.releaseDate}
                onChange={(e) => setDetails({...details, releaseDate: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">开发商</label>
              <input 
                type="text" 
                value={details.developer}
                onChange={(e) => setDetails({...details, developer: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">支持平台 (逗号分隔)</label>
              <input 
                type="text" 
                value={details.platforms}
                onChange={(e) => setDetails({...details, platforms: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">年龄分级</label>
              <input 
                type="text" 
                value={details.ageRating}
                onChange={(e) => setDetails({...details, ageRating: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">价格</label>
              <input 
                type="number" 
                step="0.01"
                value={details.price}
                onChange={(e) => setDetails({...details, price: parseFloat(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">折扣</label>
              <input 
                type="number" 
                step="0.01"
                value={details.discount}
                onChange={(e) => setDetails({...details, discount: parseFloat(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="mr-4 px-4 py-2 bg-gray-200 rounded"
            >
              取消
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded"
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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProject() {
      try {
        console.log(`正在获取项目详情：/api/database/${id}`);
        const response = await fetch(`/api/database/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('响应状态:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('获取项目详情失败:', errorText);
          throw new Error(`获取项目详情失败：${errorText}`);
        }
        
        const data = await response.json();
        console.log('获取的项目数据:', data);
        
        setProject(data);
        setLoading(false);
      } catch (err) {
        console.error('获取项目详情时发生错误:', err);
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('确定要删除这个游戏吗？')) {
      try {
        const response = await fetch(`/api/database/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          navigate('/database');
        } else {
          const errorData = await response.json();
          alert(`删除失败: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('删除游戏时发生错误');
      }
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!project) return <div>未找到项目</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <div>
            <button 
              onClick={handleDelete} 
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              删除
            </button>
            <button 
              onClick={() => navigate(`/edit/${project.id}`)} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              编辑
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">基本信息</h2>
            <p><strong>类别:</strong> {project.category}</p>
            <p><strong>描述:</strong> {project.description}</p>
            <p><strong>详细描述:</strong> {project.details.fullDescription}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">男娘统计</h2>
            <p><strong>男娘数量:</strong> {project.details.femboyCount}</p>
            <p><strong>可爱度:</strong> {project.details.cuteness}/100</p>
            
            {project.details.femboyCharacters && (
              <div>
                <h3 className="text-lg font-semibold mt-2">男娘角色</h3>
                {project.details.femboyCharacters.map((char, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded mt-1">
                    <p><strong>{char.name}</strong></p>
                    <p>年龄: {char.age}</p>
                    <p>描述: {char.description}</p>
                    {char.abilities && (
                      <p>能力: {char.abilities.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">游戏标签</h2>
            <div className="flex flex-wrap gap-2">
              {project.details.gameTags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">发行信息</h2>
            <p><strong>发行日期:</strong> {project.details.releaseDate || '未知'}</p>
            <p><strong>开发商:</strong> {project.details.developer || '未知'}</p>
            <p><strong>支持平台:</strong> {project.details.platforms?.join(', ') || '未知'}</p>
            <p><strong>年龄分级:</strong> {project.details.ageRating || '未分级'}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">价格信息</h2>
            <p><strong>价格:</strong> {project.details.price ? `¥${project.details.price.toFixed(2)}` : '免费'}</p>
            <p><strong>折扣:</strong> {project.details.discount ? `${(project.details.discount * 100).toFixed(0)}%` : '无折扣'}</p>
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
